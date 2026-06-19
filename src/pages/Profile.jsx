// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowRight, FiHeart } from "react-icons/fi"; // Injected FiHeart icon

import { getGithubUser } from "../services/githubApi";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileStats from "../components/profile/ProfileStats";

function Profile() {
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorited, setIsFavorited] = useState(false); // Tracks if user is saved

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const data = await getGithubUser(username);
        setUser(data);
        setError("");

        // Check if this specific developer is ALREADY saved in localStorage
        const savedFavorites = JSON.parse(localStorage.getItem("devPulse_favorites")) || [];
        const exists = savedFavorites.some((fav) => fav.login.toLowerCase() === username.toLowerCase());
        setIsFavorited(exists);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [username]);

  // THE TOGGLE FAVORITES FUNCTION
  const handleToggleFavorite = () => {
    // 1. Get current saved array from storage (or start empty array if none)
    const savedFavorites = JSON.parse(localStorage.getItem("devPulse_favorites")) || [];

    if (isFavorited) {
      // REMOVE: Filter them out of the list
      const updatedFavorites = savedFavorites.filter((fav) => fav.login !== user.login);
      localStorage.setItem("devPulse_favorites", JSON.stringify(updatedFavorites));
      setIsFavorited(false);
    } else {
      // ADD: Push a clean mini-profile packet into the array list
      const miniProfile = {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        public_repos: user.public_repos
      };
      const updatedFavorites = [...savedFavorites, miniProfile];
      localStorage.setItem("devPulse_favorites", JSON.stringify(updatedFavorites));
      setIsFavorited(true);
    }
  };

  if (loading) return <div className="flex flex-1 items-center justify-center font-mono text-xs text-slate-500">Loading profile...</div>;
  if (error) return <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-red-400 font-mono text-center max-w-md mx-auto mt-12">{error}</div>;
  if (!user) return null;

  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto py-4">
      
      {/* INTERACTIVE SAVE TOOL BAR BOX */}
      <div className="flex justify-between items-center bg-slate-900/40 border border-slate-800 p-4 rounded-xl font-mono text-xs">
        <span className="text-slate-400">INDEX_TARGET // @{user.login}</span>
        
        <button
          onClick={handleToggleFavorite}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold border transition-all cursor-pointer ${
            isFavorited 
              ? "bg-rose-500/10 border-rose-500/30 text-rose-400" 
              : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
          }`}
        >
          <FiHeart className={isFavorited ? "fill-rose-400" : ""} />
          {isFavorited ? "REMOVE INTEL" : "SAVE PROFILE"}
        </button>
      </div>

      <ProfileCard user={user} />
      <ProfileStats user={user} />

      <div className="pt-2 flex justify-end">
        <Link to={`/repositories/${user.login}`} className="flex items-center gap-2 font-mono text-xs font-semibold bg-violet-600 text-white px-5 py-3 rounded-xl shadow-lg shadow-violet-600/10">
          EXPLORE CODEBASE REPOSITORIES <FiArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export default Profile;
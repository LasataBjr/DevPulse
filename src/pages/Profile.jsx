// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Added Link
import { FiArrowRight } from "react-icons/fi"; // Visual icon

import { getGithubUser } from "../services/githubApi";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileStats from "../components/profile/ProfileStats";

function Profile() {
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const data = await getGithubUser(username);
        setUser(data); // receives github db engine json object packet
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [username]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center font-mono">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-6 w-6 border-2 border-t-transparent border-violet-500 rounded-full animate-spin" />
          <p className="text-xs text-slate-500 uppercase tracking-widest">Loading core files...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center max-w-md mx-auto font-mono mt-12">
        <p className="text-red-400 text-sm font-bold uppercase tracking-wider mb-2">Registry Look-up Failed</p>
        <p className="text-xs text-slate-400">{error}</p>
        <div className="mt-4 pt-4 border-t border-red-500/10">
          <Link to="/" className="text-xs text-cyan-400 hover:underline">⭠ Return to Mainframe Base</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto py-4">
      {/* Injected State Package Variable -> Sent Downward as a Prop */}
      <ProfileCard user={user} />

      {/* Injected State Package Variable -> Sent Downward as a Prop */}
      <ProfileStats user={user} />

      {/* ENHANCEMENT LINK: Navigates straight to the dynamic repository view */}
      <div className="pt-2 flex justify-end">
        <Link
          to={`/repositories/${user.login}`}
          className="flex items-center gap-2 font-mono text-xs font-semibold bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl transition-all shadow-lg shadow-violet-600/10 hover:shadow-violet-600/20"
        >
          EXPLORE CODEBASE REPOSITORIES
          <FiArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export default Profile;
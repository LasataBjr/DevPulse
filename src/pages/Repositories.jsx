// src/pages/Repositories.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getGithubRepos } from "../services/githubApi";
import RepoCard from "../components/repositories/RepoCard";
import { FiCode, FiArrowLeft } from "react-icons/fi";

export default function Repositories() {
  const { username } = useParams(); // Read parameter string out of url bar

  // State Array Storage buckets
  const [repos, setRepos] = useState([]); // 👈 Initialized to an empty array [] since we expect a list!
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReposData() {
      try {
        setLoading(true);
        const data = await getGithubRepos(username); // Data arrives as array []
        setRepos(data); // Save the complete array pack
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReposData();
  }, [username]);

  // Network State Conditionals Renders
  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center font-mono text-xs text-slate-500">
        <div className="space-y-2 text-center">
          <div className="mx-auto h-5 w-5 border-2 border-t-transparent border-violet-500 rounded-full animate-spin" />
          <p className="uppercase tracking-widest">Opening Codebase Streams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 font-mono text-center max-w-md mx-auto mt-12">
        <p className="text-red-400 text-xs font-bold uppercase tracking-wider">Access Blocked</p>
        <p className="text-xs text-slate-400 mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full py-4">
      
      {/* Title Nav Layout Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-slate-900 border border-slate-800 text-cyan-400 rounded-xl flex items-center justify-center">
            <FiCode size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white tracking-tight">Codebase Vault Index</h2>
            <p className="text-xs font-mono text-slate-400">Reviewing source parameters for @{username}</p>
          </div>
        </div>

        {/* Quick Link backward jump mechanism directly to profile view */}
        <Link 
          to={`/profile/${username}`}
          className="flex items-center gap-1.5 font-mono text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl transition-all shadow-xs"
        >
          <FiArrowLeft size={14} />
          PROFILE METRICS
        </Link>
      </div>

      {/* RENDER THE GRID DATA PACK LIST */}
      {repos.length === 0 ? (
        <p className="text-center text-sm text-slate-500 font-mono py-12">No active repository records cataloged in this matrix pipeline.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Loop over our state list data with map */}
          {repos.map((repo) => (
            // Hand each specific codebase down as a prop to our RepoCard element block
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}

    </div>
  );
}
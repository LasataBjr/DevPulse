// src/pages/Home.jsx
import SearchBar from "../components/common/SearchBar";
import { FiCpu } from "react-icons/fi";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-8 py-12">
      {/* Branding Header Block */}
      <div className="text-center space-y-3 max-w-md">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-violet-500 shadow-md">
          <FiCpu size={24} className="animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold font-mono tracking-tight text-white">
          GitHub Terminal Core
        </h2>
        <p className="text-slate-400 text-xs font-mono leading-relaxed">
          Input a developer profile parameter tag below to fetch deep-analytics, repository details, and system profiles metadata metrics.
        </p>
      </div>

      {/* Mount our search redirect component */}
      <SearchBar />

      {/* Quick Search Helper Badges */}
      <div className="text-center pt-4">
        <span className="text-[11px] font-mono text-slate-600 uppercase tracking-widest block mb-2">
          Suggested Parameters
        </span>
        <div className="flex items-center gap-2 justify-center text-xs font-mono text-cyan-400">
          <span className="bg-slate-900/60 border border-slate-800 px-2.5 py-1 rounded-md">octocat</span>
          <span className="bg-slate-900/60 border border-slate-800 px-2.5 py-1 rounded-md">torvalds</span>
          <span className="bg-slate-900/60 border border-slate-800 px-2.5 py-1 rounded-md">gaearon</span>
        </div>
      </div>
    </div>
  );
}
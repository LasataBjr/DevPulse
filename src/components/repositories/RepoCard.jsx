import { FiFolder, FiStar, FiGitBranch, FiExternalLink } from "react-icons/fi";

// Accepts a single 'repo' object as a prop attribute packet
export default function RepoCard({ repo }) {
  return (
    <div className="border border-slate-800 bg-slate-900/60 p-5 rounded-2xl flex flex-col justify-between hover:border-violet-500/30 transition-all duration-200 shadow-lg group">
      
      {/* Upper Content Slot */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 text-violet-400">
            <FiFolder className="shrink-0" size={18} />
            {/* Live Anchor Link directly to the real GitHub code webpage */}
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noreferrer"
              className="text-sm font-bold font-mono text-white hover:text-cyan-400 transition-colors break-all flex items-center gap-1"
            >
              {repo.name}
              <FiExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500" />
            </a>
          </div>
          
          {/* Main Language Identifier Badge tag */}
          {repo.language && (
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-800 text-cyan-400 border border-slate-700/50 shrink-0">
              {repo.language}
            </span>
          )}
        </div>

        {/* Project Description Context */}
        <p className="text-xs text-slate-400 font-sans line-clamp-2 leading-relaxed min-h-[32px]">
          {repo.description || "No description logged for this codebase terminal vault entry."}
        </p>
      </div>

      {/* Bottom Metric Bar Layout */}
      <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-4 border-t border-slate-800/60 mt-4">
        {/* Stars Counter Element */}
        <span className="flex items-center gap-1 hover:text-amber-400 transition-colors">
          <FiStar size={14} className="text-amber-500" />
          {repo.stargazers_count}
        </span>
        
        {/* Forks Counter Element */}
        <span className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
          <FiGitBranch size={14} className="text-emerald-500" />
          {repo.forks_count}
        </span>
      </div>

    </div>
  );
}
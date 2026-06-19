// src/pages/Analytics.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getGithubRepos } from "../services/githubApi";
import { 
  FiActivity, 
  FiArrowLeft, 
  FiStar, 
  FiGitBranch, 
  FiTrendingUp, 
  FiCpu, 
  FiTerminal 
} from "react-icons/fi";

export default function Analytics() {
  const { username } = useParams();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        setLoading(true);
        const data = await getGithubRepos(username);
        setRepos(data);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    // Only fetch if we have a valid, searched username parameter target
    if (username && username !== "mainframe") {
      fetchAnalyticsData();
    } else {
      setLoading(false);
    }
  }, [username]);

  // --- EMPTY STATE GUARD RAIL BARRIER ---
  if (!username || username === "mainframe") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center font-mono space-y-4 max-w-md mx-auto text-center py-12">
        <div className="h-12 w-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shadow-sm">
          <FiActivity size={24} className="animate-pulse" />
        </div>
        <h3 className="text-base font-bold text-white uppercase tracking-wider">Analytics Deck Offline</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          No live parameter keys registered in terminal tracking cache memory buffers. Please return to the launchpad mainframe terminal and execute a profile lookup script to activate downstream charts tracking logs.
        </p>
        <Link to="/" className="text-xs bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl transition-colors font-semibold">
          RETURN TO MAIN TERMINALBASE
        </Link>
      </div>
    );
  }

  if (loading) return <div className="flex flex-1 items-center justify-center font-mono text-xs text-slate-500">Running system diagnostic matrix...</div>;
  if (error) return <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-red-400 font-mono text-center max-w-md mx-auto mt-12">{error}</div>;

  // ADVANCED DATA PROCESSING ENGINE (Derived State Calculations)
  // Calculate Aggregate Totals
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
  
  // Identify Highest Starred Repository
  const highestStarred = repos.length > 0 
    ? [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0] 
    : null;

  // Process Codebase Language Allocations Map Array Counts
  const langCounts = {};
  repos.forEach((repo) => {
    if (repo.language) {
      langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
    }
  });

  const totalLanguagesCount = Object.values(langCounts).reduce((acc, curr) => acc + curr, 0);
  
  // Extract dominant technology text value
  const topLanguage = Object.keys(langCounts).length > 0 
    ? Object.keys(langCounts).reduce((a, b) => (langCounts[a] > langCounts[b] ? a : b)) 
    : "Plain Text";

  return (
    <div className="space-y-6 w-full py-4 font-mono">
      
      {/* Header Deck Navigation Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-slate-900 border border-slate-800 text-violet-400 rounded-xl flex items-center justify-center">
            <FiActivity size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Analytics Command Center</h2>
            <p className="text-xs text-slate-400">Processed data metrics for target parameter: @{username}</p>
          </div>
        </div>

        <Link to={`/profile/${username}`} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl transition-all shadow-xs">
          <FiArrowLeft size={14} /> RE-LOAD PROFILE
        </Link>
      </div>

      {repos.length === 0 ? (
        <div className="border border-dashed border-slate-800 p-12 rounded-2xl text-center text-slate-500 text-sm">
          INSIGNIFICANT REPOSITORY DATA SAMPLES REGISTERED TO COMPUTE METRICS.
        </div>
      ) : (
        <>
          {/* TOP TRACKING CARDS GRID: CORE QUANTITATIVE METRICS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl space-y-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Aggregate Code Base Stars</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-3xl font-bold text-amber-400">{totalStars}</h3>
                <FiStar size={18} className="text-amber-500/30" />
              </div>
            </div>

            <div className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl space-y-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Downstream Ecosystem Forks</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-3xl font-bold text-emerald-400">{totalForks}</h3>
                <FiGitBranch size={18} className="text-emerald-500/30" />
              </div>
            </div>

            <div className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl space-y-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Primary Technology Stack</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-bold text-cyan-400 truncate max-w-[85%]">{topLanguage}</h3>
                <FiCpu size={18} className="text-cyan-500/30" />
              </div>
            </div>

          </div>

          {/* TWO COLUMN INTERACTIVE METRIC BLOCKS CONTAINER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CARD ONE: LANGUAGE DISTRIBUTIONS BREAKDOWN */}
            <div className="border border-slate-800 bg-slate-900/20 p-6 rounded-2xl space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                <FiTerminal className="text-cyan-400" /> Language Allocations Ratio
              </h4>
              
              <div className="space-y-4 pt-2">
                {Object.entries(langCounts)
                  .sort((a, b) => b[1] - a[1]) // Render most used language on top
                  .map(([lang, count]) => {
                    const percentage = Math.round((count / totalLanguagesCount) * 100);
                    return (
                      <div key={lang} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-300 font-semibold">{lang}</span>
                          <span className="text-slate-500">{percentage}% ({count})</span>
                        </div>
                        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className="bg-gradient-to-r from-violet-600 to-indigo-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* CARD TWO: APEX REPOSITORY SPOTLIGHT DISPLAY */}
            <div className="border border-slate-800 bg-slate-900/20 p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                  <FiTrendingUp className="text-amber-400" /> Apex Project Spotlight
                </h4>
                
                {highestStarred ? (
                  <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-xl space-y-3 mt-4">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-sm font-bold text-violet-400 truncate">{highestStarred.name}</span>
                      <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                        <FiStar size={10} className="fill-amber-400/20" /> {highestStarred.stargazers_count}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-sans line-clamp-4 leading-relaxed">
                      {highestStarred.description || "No public documentation logs found specifying this codebase architecture's operational intent structure blueprints."}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic pt-4">No stellar spotlight indexes logged.</p>
                )}
              </div>

              <div className="text-[10px] text-slate-500 border-t border-slate-800/50 pt-3 flex items-center justify-between">
                <span>STATUS // DATA_TRANSFORMATION_SUCCESS</span>
                <span>METRICS_v1.0</span>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
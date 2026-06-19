// src/pages/Favorites.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiFolder, FiTrash2 } from "react-icons/fi";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // 1. Read bookmarks automatically when page component awakens
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("devPulse_favorites")) || [];
    setFavorites(saved);
  }, []);

  // 2. Clear item directly from this directory window
  const handleRemoveFavorite = (loginToRemove) => {
    const updated = favorites.filter((fav) => fav.login !== loginToRemove);
    localStorage.setItem("devPulse_favorites", JSON.stringify(updated));
    setFavorites(updated); // Instantly updates screen array loop!
  };

  return (
    <div className="space-y-6 w-full py-4 font-mono">
      
      {/* Page Header Banner */}
      <div className="border-b border-slate-800 pb-4 flex items-center gap-3">
        <div className="h-10 w-10 bg-slate-900 border border-slate-800 text-rose-400 rounded-xl flex items-center justify-center">
          <FiHeart size={20} className="fill-rose-400/20" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Saved Intel Directory</h2>
          <p className="text-xs text-slate-400">Offline cached developer registry keys index logs</p>
        </div>
      </div>

      {/* RENDER GRID */}
      {favorites.length === 0 ? (
        <div className="border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-xs">
          NO SAVED PARAMETERS DISCOVERED IN LOCAL COLD STORAGE STORAGE.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((fav) => (
            <div key={fav.login} className="border border-slate-800 bg-slate-900/50 p-4 rounded-xl flex flex-col justify-between hover:border-slate-700 transition-colors">
              
              {/* Dev metadata info card blocks */}
              <div className="flex items-center gap-3">
                <img src={fav.avatar_url} alt={fav.login} className="w-12 h-12 rounded-lg border border-slate-800" />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{fav.name || fav.login}</h4>
                  <span className="text-[11px] text-cyan-400 block">@{fav.login}</span>
                </div>
              </div>

              {/* Action utilities bar */}
              <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800/60 text-xs">
                <Link 
                  to={`/profile/${fav.login}`}
                  className="text-violet-400 hover:text-violet-300 font-bold flex items-center gap-1"
                >
                  LOAD INDEX ⭢
                </Link>

                <button
                  onClick={() => handleRemoveFavorite(fav.login)}
                  className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                  title="Purge record"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
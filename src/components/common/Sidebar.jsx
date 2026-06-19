import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiHeart,
  FiFolder,
  FiBarChart2,
} from "react-icons/fi";

export default function Sidebar() {
  const links = [
    {
      path: "/",
      label: "Dashboard",
      icon: <FiHome size={18} />,
    },
    {
      path: "/favorites",
      label: "Favorites",
      icon: <FiHeart size={18} />,
    },
    {
      path: "/repositories",
      label: "Repositories",
      icon: <FiFolder size={18} />,
    },
    // {
    //   path: "/analytics",
    //   label: "Analytics",
    //   icon: <FiBarChart2 size={18} />,
    // },
  ];

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col justify-between border-r border-slate-800 bg-slate-900 text-white">
      {/* Top Section */}
      <div>
        {/* Brand */}
        <div className="border-b border-slate-800 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 font-bold text-cyan-300 shadow-lg">
              Ω
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-wide">
                DevPulse
              </h1>

              <p className="text-xs text-cyan-400">
                GitHub Analytics
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Navigation
          </div>

          <div className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-violet-600/20 text-white border border-violet-500/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <span className="text-cyan-400">
                  {link.icon}
                </span>

                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
        <div className="rounded-xl bg-slate-800/50 p-3">
          <p className="text-xs text-slate-500">
            SYSTEM STATUS
          </p>

          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>

            <span className="text-xs text-slate-300">
              API Connected
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

import { NavLink } from "react-router-dom";
import { FiHome, FiHeart } from "react-icons/fi";

export default function Sidebar() {
  const links = [
    { path: "/", label: "Mainframe Terminal", icon: <FiHome size={18} /> },
    { path: "/favorites", label: "Saved Profiles", icon: <FiHeart size={18} /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between h-screen p-4 text-white shrink-0 font-mono">
      <div className="space-y-8">
        {/* Branding Platform Banner */}
        <div className="flex items-center gap-3 px-2 pt-2">
          <div className="h-8 w-8 rounded-lg bg-violet-600 flex items-center justify-center font-bold text-cyan-400 border border-cyan-500/20 shadow-md">
            Ω
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider text-slate-100 uppercase">DevPulse</h1>
            <span className="text-[10px] text-cyan-400 font-mono tracking-widest block uppercase">v1.0.0_core</span>
          </div>
        </div>

        {/* Dynamic Nav Links mapping */}
        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
                  isActive
                    ? "bg-violet-600/20 border border-violet-500/30 text-white"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`
              }
            >
              <span className="text-cyan-400">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-slate-800 pt-4 px-2 text-[10px] text-slate-500">
        SECURE_LINK // SYSTEM_READY
      </div>
    </aside>
  );
}
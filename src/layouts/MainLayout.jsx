import Sidebar from "../components/common/Sidebar";

import { Outlet } from "react-router-dom";

export default function DevLayout() {
  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/*Left Navigation Menu Panel */}
      <Sidebar />

      {/* Right Adaptive Workspace Content Panel */}
      <main className="flex-1 overflow-y-auto p-8 relative flex flex-col">
        {/* Sleek Cyberpunk Ambient Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 flex flex-col">
          {/* Active routes inject their individual code files directly right here */}
          <Outlet /> 
        </div>
      </main>
    </div>
  );
}
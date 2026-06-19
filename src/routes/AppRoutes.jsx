// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import DevLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Repositories from "../pages/Repositories";
import Favorites from "../pages/Favorites";
import Analytics from "../pages/Analytics";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Inject everything underneath our dark Technical Dashboard shell */}
      <Route element={<DevLayout />}>
        {/* Fixed Core Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        
        {/* Dynamic Variable Parameter Routes (:username token placeholders) */}
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/repositories/:username" element={<Repositories />} />
        <Route path="/analytics/:username" element={<Analytics />} />
        
        {/* Guard Rail Fallback: Redirect anything else straight back home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
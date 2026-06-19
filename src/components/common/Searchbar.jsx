
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  // 1. Local state to track exactly what the user is typing line-by-line
  const [usernameInput, setUsernameInput] = useState("");
  
  // 2. Initialize the navigation control wheel from React Router
  const navigate = useNavigate();

  // 3. This function executes when the user hits "Enter" or clicks "EXECUTE"
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page!
    
    // Safety check: Don't search if the input is completely empty space
    if (!usernameInput.trim()) return;

    // THE REDIRECT ROUTING TRIGGER: 
    // This tells the router to instantly change the browser path!
    // Example: If they typed "octocat", it pushes them to "/profile/octocat"
    navigate(`/profile/${usernameInput.trim()}`);
  };

  return (
    <form 
      onSubmit={handleSearchSubmit} 
      className="flex items-center gap-3 w-full max-w-xl bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus-within:border-violet-500/50 transition-all duration-200 shadow-xl shadow-black/40"
    >
      {/* Search Icon */}
      <FiSearch className="text-slate-500 shrink-0" size={18} />
      
      {/* The Text Input Area */}
      <input
        type="text"
        placeholder="Enter GitHub username (e.g., octocat)..."
        value={usernameInput}
        // Every single keystroke updates our state variable instantly
        onChange={(e) => setUsernameInput(e.target.value)} 
        className="w-full bg-transparent outline-hidden border-0 text-sm font-mono placeholder-slate-600 text-slate-100"
      />
      
      {/* Form Submit Button */}
      <button 
        type="submit"
        className="bg-violet-600 hover:bg-violet-700 text-white font-mono text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
      >
        EXECUTE
      </button>
    </form>
  );
}
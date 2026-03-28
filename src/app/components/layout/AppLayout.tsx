import { Outlet, NavLink, useNavigate, useLocation } from "react-router";
import { Home, Search, Library, Users, Play, Pause, SkipForward, Maximize2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PlayerScreenWrapper } from "../screens/PlayerScreenWrapper";

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const isPlayerScreen = location.pathname === "/player";

  return (
    <div className="relative w-full h-[100dvh] sm:h-[844px] sm:w-[390px] mx-auto bg-[#0e0e0e] overflow-hidden flex flex-col text-white font-sans sm:rounded-[40px] sm:border sm:border-white/10 sm:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {/* Hide original static navs from imported components */}
      <style>{`
        [data-name="BottomNavBar"],
        [data-name="Bottom Navigation (Shared Component)"],
        [data-name="Header - TopAppBar"],
        [data-name="Header - Top Navigation Anchor (Shared Component)"],
        [data-name="Mini Player (Floating over Nav)"],
        [data-name="Mini Player (Floating Glassmorphism)"] {
          display: none !important;
        }
        
        /* Make sure the page container fills the screen but allows scrolling */
        .page-container > div {
          height: 100vh !important;
          overflow-y: auto !important;
        }
      `}</style>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto page-container relative z-0 pb-[180px]">
        <AnimatePresence mode="wait">
          {!isPlayerScreen && (
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <Outlet />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Top Header */}
      <div className="absolute top-0 left-0 w-full z-40 bg-gradient-to-b from-[#0e0e0e] via-[#0e0e0e]/80 to-transparent px-6 py-4 flex items-center justify-between pointer-events-none">
        <div className="flex gap-3 items-center pointer-events-auto">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3af9e7] to-[#17ead9] flex items-center justify-center text-[#005a53] font-bold italic">
            M
          </div>
          <span className="text-[#3af9e7] font-extrabold italic text-2xl tracking-tight">MaxLinify</span>
        </div>
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md pointer-events-auto hover:bg-white/10 transition overflow-hidden">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop" alt="User Profile" className="w-full h-full object-cover" />
        </button>
      </div>

      {/* Floating Mini Player */}
      <div 
        className="absolute bottom-[96px] left-4 right-4 z-50 rounded-[32px] p-3 backdrop-blur-xl bg-[#131313]/80 border border-white/5 shadow-2xl flex items-center justify-between cursor-pointer hover:bg-[#1a1a1a]/90 transition-colors"
        onClick={() => navigate('/player')}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-zinc-800 flex-shrink-0 relative">
            <img 
              src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=150&auto=format&fit=crop" 
              alt="Neon Pulse" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">Midnight City</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#2ff801]">M83</span>
              <div className="flex items-end gap-[2px] h-3">
                <div className="w-[2px] h-2 bg-[#2ff801] rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
                <div className="w-[2px] h-3 bg-[#2ff801] rounded-full animate-[pulse_1.2s_ease-in-out_infinite]" />
                <div className="w-[2px] h-1.5 bg-[#2ff801] rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 pr-2" onClick={e => e.stopPropagation()}>
          <button 
            className="w-8 h-8 flex items-center justify-center text-white hover:text-[#3af9e7] transition-colors"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-[#adaaaa] hover:text-white transition-colors">
            <SkipForward size={20} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 w-full z-50 pb-8 pt-4 px-6 bg-[#131313]/90 backdrop-blur-xl rounded-t-[32px] shadow-[0_-10px_30px_rgba(0,0,0,0.5)] border-t border-white/5 flex justify-around items-center">
        <NavItem to="/" icon={<Home size={22} />} label="Home" />
        <NavItem to="/search" icon={<Search size={22} />} label="Search" />
        <NavItem to="/library" icon={<Library size={22} />} label="Library" />
        <NavItem to="/community" icon={<Users size={22} />} label="Community" />
      </div>

      {/* Full Screen Player Overlay */}
      <AnimatePresence>
        {isPlayerScreen && (
          <div className="absolute inset-0 z-[100]">
            <Outlet />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#3af9e7]' : 'text-[#adaaaa] hover:text-white'}`
      }
    >
      {({ isActive }) => (
        <>
          <div className={`${isActive ? 'drop-shadow-[0_0_8px_rgba(58,249,231,0.5)]' : ''}`}>
            {icon}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
        </>
      )}
    </NavLink>
  );
}

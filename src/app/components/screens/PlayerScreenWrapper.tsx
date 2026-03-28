import MaxLinifyPlayerScreen from "../../../imports/MaxLinifyPlayerScreen";
import { useNavigate } from "react-router";
import { ChevronDown, MoreVertical, Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Heart } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export function PlayerScreenWrapper() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="relative w-full h-full bg-[#0e0e0e] overflow-hidden text-white font-sans sm:rounded-[40px]"
    >
      <style>{`
        /* Hide static original nav components */
        [data-name="Header - Top Navigation Anchor (Shared Component)"],
        [data-name="Bottom Navigation (Shared Component)"],
        [data-name="Playback Controls"] {
          display: none !important;
        }
      `}</style>
      
      {/* Background artwork blur */}
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-screen bg-cover bg-center blur-[100px] scale-150 transform transition-transform duration-1000"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=600&auto=format&fit=crop')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#0e0e0e]/80 to-[#0e0e0e]" />
      
      {/* Scrollable canvas containing the actual generated player */}
      <div className="absolute inset-0 z-10 overflow-y-auto page-container">
        <MaxLinifyPlayerScreen />
      </div>

      {/* Interactive Top Bar overlay */}
      <div className="absolute top-0 left-0 w-full z-50 px-[24px] py-[16px] flex justify-between items-center bg-gradient-to-b from-[#0e0e0e] to-transparent pointer-events-none">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-white/10 transition-colors pointer-events-auto -ml-3"
        >
          <ChevronDown size={28} className="text-white" />
        </button>
        <span className="text-[#3af9e7] font-bold tracking-tight text-sm uppercase">Now Playing</span>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-white/10 transition-colors pointer-events-auto -mr-3">
          <MoreVertical size={24} className="text-white" />
        </button>
      </div>

      {/* Interactive Playback Controls Overlay */}
      <div className="absolute bottom-[140px] left-[24px] right-[24px] z-50 flex items-center justify-between px-[8px]">
        <button className="w-10 h-10 flex items-center justify-center text-[#adaaaa] hover:text-white transition">
          <Shuffle size={20} />
        </button>
        <div className="flex items-center gap-8">
          <button className="w-12 h-12 flex items-center justify-center text-white hover:text-[#3af9e7] transition">
            <SkipBack size={24} fill="currentColor" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(58,249,231,0.4)] transition-transform hover:scale-105"
            style={{ backgroundImage: "linear-gradient(135deg, rgb(58, 249, 231) 0%, rgb(23, 234, 217) 100%)" }}
          >
            {isPlaying ? (
              <Pause size={28} fill="#005A53" className="text-[#005A53]" />
            ) : (
              <Play size={28} fill="#005A53" className="text-[#005A53] ml-1" />
            )}
          </button>
          <button className="w-12 h-12 flex items-center justify-center text-white hover:text-[#3af9e7] transition">
            <SkipForward size={24} fill="currentColor" />
          </button>
        </div>
        <button className="w-10 h-10 flex items-center justify-center text-[#2ff801] hover:text-white transition">
          <Repeat size={20} />
        </button>
      </div>
      
      {/* Like button interactive overlay */}
      <div className="absolute top-[478px] right-[24px] z-50 pointer-events-auto">
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="w-10 h-10 flex items-center justify-center hover:scale-110 transition"
        >
          <Heart size={24} fill={isLiked ? "#3af9e7" : "transparent"} className={isLiked ? "text-[#3af9e7]" : "text-[#adaaaa]"} />
        </button>
      </div>
    </motion.div>
  );
}

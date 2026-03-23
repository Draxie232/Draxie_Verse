import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

const Home = () => {
  // Mock data for your video feed
  const [videos, setVideos] = useState([
    { 
      id: 1, 
      creator: "DraxieCreator", 
      desc: "My latest cinematic flow 🎥✨", 
      isLiked: false, 
      color: "from-purple-900 to-black" 
    },
    { 
      id: 2, 
      creator: "NeonVibes", 
      desc: "Testing the new AR features...", 
      isLiked: true, 
      color: "from-blue-900 to-black" 
    },
    { 
      id: 3, 
      creator: "PixelArtist", 
      desc: "Behind the scenes of my workflow.", 
      isLiked: false, 
      color: "from-fuchsia-900 to-black" 
    },
  ]);

  // Function to toggle the heart icon color
  const toggleLike = (id) => {
    setVideos(videos.map(vid => 
      vid.id === id ? { ...vid, isLiked: !vid.isLiked } : vid
    ));
  };

  return (
    
    
    // The main container: h-screen makes it full height, snap-y creates the TikTok scroll effect
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      
      {videos.map((video) => (
        // Each video takes up the full screen (h-screen) and snaps into place (snap-start)
        <div 
          key={video.id} 
          className="relative h-screen w-full snap-start bg-black flex items-center justify-center overflow-hidden"
        >
          
          {/* SIMULATED VIDEO BACKGROUND */}
          {/* Replace this div with your actual <video> tag later */}
          <div className={`absolute inset-0 bg-gradient-to-br ${video.color} opacity-40`}></div>
          <h2 className="relative z-10 text-white/20 text-2xl font-black tracking-widest uppercase">
            Video {video.id}
          </h2>

          {/* OVERLAY UI - Positioned at the bottom, above the nav bar */}
          {/* pb-28 ensures it sits above your BottomNav, pt-32 creates a smooth dark fade */}
          <div className="absolute bottom-0 left-0 w-full pb-28 pt-32 px-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end z-20">
            
            {/* Creator Info */}
            <div className="mb-4">
              <h3 className="text-white font-extrabold text-lg flex items-center gap-2 drop-shadow-md">
                @{video.creator}
              </h3>
              <p className="text-gray-300 text-sm mt-1 drop-shadow-md">
                {video.desc}
              </p>
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-3">
              
              {/* Approach Button - Using your signature Fuchsia color */}
              <button className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(217,70,239,0.3)] active:scale-95">
                <Sparkles size={18} />
                <span className="tracking-wide">Approach</span>
              </button>

              {/* Like Button - Dark glassmorphism to match your theme */}
              <button 
                onClick={() => toggleLike(video.id)}
                className="w-14 h-14 shrink-0 bg-[#15111a]/80 backdrop-blur-md border border-[#2a2432] rounded-2xl flex items-center justify-center transition-all hover:bg-[#221c2b] active:scale-95"
              >
                <Heart 
                  size={24} 
                  className={`transition-colors duration-300 ${
                    video.isLiked 
                      ? "fill-fuchsia-500 text-fuchsia-500 drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]" 
                      : "text-white"
                  }`} 
                />
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
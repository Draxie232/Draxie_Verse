import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Eye, Volume2, VolumeX } from 'lucide-react';

// ==========================================
// 1. SMART VIDEO COMPONENT
// This tracks if it's on-screen to play/pause automatically
// ==========================================
const VideoPost = ({ video, isMuted, toggleMute, handleLike, handleVideoPlay }) => {
  const videoRef = useRef(null);
  const username = video.userEmail ? video.userEmail.split('@')[0] : "Creator";

  useEffect(() => {
    // Intersection Observer watches when the video scrolls into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Video is on screen -> Play it and count the view
          videoRef.current.play().catch(err => console.log("Autoplay blocked by browser:", err));
          handleVideoPlay(video._id); 
        } else {
          // Video scrolled off screen -> Pause it
          videoRef.current.pause();
        }
      },
      { threshold: 0.6 } // Triggers when 60% of the video is visible
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, [video._id, handleVideoPlay]);

  return (
    <div className="relative h-screen w-full snap-start bg-black flex items-center justify-center overflow-hidden">
      
      {/* THE VIDEO */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        muted={isMuted} // Controlled globally by the state
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        onClick={toggleMute} // Tapping the video itself can also toggle mute!
      />
      
      {/* OVERLAY UI */}
      <div className="absolute bottom-0 left-0 w-full pb-28 pt-32 px-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end z-20 pointer-events-none">
        
        <div className="mb-4 pointer-events-auto flex justify-between items-end">
          {/* Creator Info */}
          <div>
            <h3 className="text-white font-extrabold text-lg flex items-center gap-2 drop-shadow-md">
              @{username}
            </h3>
            <p className="text-white font-semibold mt-1 drop-shadow-md">
              {video.title}
            </p>
            {video.description && (
              <p className="text-gray-300 text-sm mt-0.5 drop-shadow-md line-clamp-2 w-4/5">
                {video.description}
              </p>
            )}
          </div>

          {/* Mute/Unmute Floating Button */}
          <button 
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-black/60 transition-colors"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-4 pointer-events-auto">
          {/* Approach Button */}
          <button className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(217,70,239,0.3)] active:scale-95 mb-5">
            <Sparkles size={18} />
            <span className="tracking-wide">Approach</span>
          </button>

          {/* Like Column */}
          <div className="flex flex-col items-center gap-1">
            <button 
              onClick={() => handleLike(video._id, video.isLiked)}
              className="w-14 h-14 shrink-0 bg-[#15111a]/80 backdrop-blur-md border border-[#2a2432] rounded-2xl flex items-center justify-center transition-all hover:bg-[#221c2b] active:scale-95"
            >
              <Heart size={24} className={`transition-colors duration-300 ${video.isLiked ? "fill-fuchsia-500 text-fuchsia-500 drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]" : "text-white"}`} />
            </button>
            <span className="text-white text-xs font-bold drop-shadow-md">{video.likes || "0"}</span>
          </div>

          {/* Views Column */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 shrink-0 bg-[#15111a]/50 backdrop-blur-md border border-[#2a2432]/50 rounded-2xl flex items-center justify-center">
              <Eye size={24} className="text-white/80" />
            </div>
            <span className="text-white/80 text-xs font-bold drop-shadow-md">{video.views || "0"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 2. MAIN HOME FEED COMPONENT
// ==========================================
const Home = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // GLOBAL MUTE STATE: Starts muted to bypass browser blocks
  const [isMuted, setIsMuted] = useState(true); 
  const viewedVideosTracker = useRef(new Set());

  useEffect(() => {
    const fetchGlobalFeed = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/videos');
        const data = await response.json();

        if (response.ok && data.videos) {
          const shuffledVideos = data.videos.sort(() => 0.5 - Math.random());
          const videosWithLikes = shuffledVideos.map(video => ({ ...video, isLiked: false }));
          setVideos(videosWithLikes);
        }
      } catch (error) {
        console.error("Failed to fetch feed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGlobalFeed();
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleLike = async (id, currentIsLiked) => {
    setVideos(videos.map(vid => {
      if (vid._id === id) {
        const currentLikesNum = parseInt(vid.likes) || 0;
        return {
          ...vid,
          isLiked: !currentIsLiked,
          likes: currentIsLiked ? (currentLikesNum - 1).toString() : (currentLikesNum + 1).toString()
        };
      }
      return vid;
    }));

    try {
      await fetch(`http://localhost:5000/api/videos/${id}/interaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: currentIsLiked ? 'unlike' : 'like' })
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleVideoPlay = async (id) => {
    if (viewedVideosTracker.current.has(id)) return;
    viewedVideosTracker.current.add(id);

    setVideos(prevVideos => prevVideos.map(vid => {
      if (vid._id === id) return { ...vid, views: (parseInt(vid.views || 0) + 1).toString() };
      return vid;
    }));

    try {
      await fetch(`http://localhost:5000/api/videos/${id}/interaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'view' })
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <span className="animate-spin w-10 h-10 border-4 border-fuchsia-500 border-t-transparent rounded-full"></span>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar relative">
      {videos.map((video) => (
        <VideoPost 
          key={video._id} 
          video={video} 
          isMuted={isMuted} 
          toggleMute={toggleMute}
          handleLike={handleLike}
          handleVideoPlay={handleVideoPlay}
        />
      ))}
    </div>
  );
};

export default Home;
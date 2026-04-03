import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Eye } from 'lucide-react';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // We use this to keep track of which videos we've already counted as "viewed" 
  // so we don't spam the database if they pause and play repeatedly.
  const viewedVideosTracker = useRef(new Set());

  useEffect(() => {
    const fetchGlobalFeed = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/videos');
        const data = await response.json();

        if (response.ok && data.videos) {
          const shuffledVideos = data.videos.sort(() => 0.5 - Math.random());
          const videosWithLikes = shuffledVideos.map(video => ({
            ...video,
            isLiked: false // Assume unliked locally on load
          }));
          setVideos(videosWithLikes);
        }
      } catch (error) {
        console.error("Failed to fetch global feed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGlobalFeed();
  }, []);

  // --- LIKE HANDLER ---
  const handleLike = async (id, currentIsLiked) => {
    // 1. Optimistic UI Update (Change it instantly on the screen)
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

    // 2. Send the update to the database in the background
    try {
      await fetch(`http://localhost:5000/api/videos/${id}/interaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: currentIsLiked ? 'unlike' : 'like' })
      });
    } catch (error) {
      console.error("Failed to sync like:", error);
    }
  };

  // --- VIEW HANDLER ---
  const handleVideoPlay = async (id) => {
    // If we already counted a view for this video during this session, ignore it.
    if (viewedVideosTracker.current.has(id)) return;

    // Mark as viewed
    viewedVideosTracker.current.add(id);

    // Update UI instantly
    setVideos(prevVideos => prevVideos.map(vid => {
      if (vid._id === id) {
        return { ...vid, views: (parseInt(vid.views || 0) + 1).toString() };
      }
      return vid;
    }));

    // Send to database
    try {
      await fetch(`http://localhost:5000/api/videos/${id}/interaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'view' })
      });
    } catch (error) {
      console.error("Failed to sync view:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <span className="animate-spin w-10 h-10 border-4 border-fuchsia-500 border-t-transparent rounded-full"></span>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center text-gray-500">
        <p>No videos found. Be the first to upload!</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar relative">
      
      {videos.map((video) => {
        const username = video.userEmail ? video.userEmail.split('@')[0] : "Creator";

        return (
          <div key={video._id} className="relative h-screen w-full snap-start bg-black flex items-center justify-center overflow-hidden">
            
            <video
              src={video.videoUrl}
              autoPlay
              muted 
              loop
              playsInline
              onPlaying={() => handleVideoPlay(video._id)} // <-- TRIGGERS VIEW COUNT HERE
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            <div className="absolute bottom-0 left-0 w-full pb-28 pt-32 px-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end z-20 pointer-events-none">
              
              <div className="mb-4 pointer-events-auto">
                <h3 className="text-white font-extrabold text-lg flex items-center gap-2 drop-shadow-md">
                  @{username}
                </h3>
                <p className="text-white font-semibold mt-1 drop-shadow-md">
                  {video.title}
                </p>
                {video.description && (
                  <p className="text-gray-300 text-sm mt-0.5 drop-shadow-md line-clamp-2">
                    {video.description}
                  </p>
                )}
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
                    <Heart 
                      size={24} 
                      className={`transition-colors duration-300 ${
                        video.isLiked 
                          ? "fill-fuchsia-500 text-fuchsia-500 drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]" 
                          : "text-white"
                      }`} 
                    />
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
      })}
    </div>
  );
};

export default Home;
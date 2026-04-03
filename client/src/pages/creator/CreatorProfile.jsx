import React, { useState, useRef, useEffect } from 'react';

// --- ICONS ---
const BigPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10 text-violet-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-400 hover:text-red-300 transition-colors">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 text-white drop-shadow-lg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);


const CreatorProfileGenZ = () => {
  const user = { username: 'DraxieCreator', role: 'Creator', totalLikes: '24.5K', totalViews: '142K' };

  const [profilePic, setProfilePic] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=DraxieGenZ');
  const [isUploadingPic, setIsUploadingPic] = useState(false);
  const picInputRef = useRef(null);

  const [videos, setVideos] = useState([]);
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const videoInputRef = useRef(null);

  // Upload Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDesc, setVideoDesc] = useState('');

  // --- NEW: FULLSCREEN PLAYER STATE ---
  const [playingVideo, setPlayingVideo] = useState(null);

  // Profile Pic Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploadingPic(true);
    const formData = new FormData();
    formData.append("image", file); 
    try {
      const uploadResponse = await fetch("http://localhost:5000/api/upload", { method: "POST", body: formData });
      const uploadData = await uploadResponse.json();
      if (uploadResponse.ok) {
        setProfilePic(uploadData.imageUrl); 
        const currentUserEmail = localStorage.getItem("userEmail"); 
        if (currentUserEmail) {
          await fetch("http://localhost:5000/api/update-profile-pic", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: currentUserEmail, imageUrl: uploadData.imageUrl }),
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploadingPic(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setShowUploadModal(true);
    }
  };

  const handleVideoUpload = async (e) => {
    e.preventDefault(); 
    if (!selectedFile) return;

    setShowUploadModal(false); 
    setIsVideoUploading(true);

    const formData = new FormData();
    formData.append("video", selectedFile);
    formData.append("title", videoTitle);
    formData.append("description", videoDesc);
    
    const currentUserEmail = localStorage.getItem("userEmail");
    if (currentUserEmail) formData.append("email", currentUserEmail);

    try {
      const uploadResponse = await fetch("http://localhost:5000/api/upload-video", { method: "POST", body: formData });
      const uploadData = await uploadResponse.json();

      if (uploadResponse.ok) {
        setVideos((prevVideos) => [uploadData.video, ...prevVideos]);
        setVideoTitle(''); setVideoDesc(''); setSelectedFile(null);
      } else {
        alert("Upload failed: " + uploadData.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsVideoUploading(false);
      if(videoInputRef.current) videoInputRef.current.value = ""; 
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this vlog? This cannot be undone.")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/videos/${videoId}`, { method: "DELETE" });
      if (response.ok) {
        setVideos(videos.filter(video => video._id !== videoId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserDataAndVideos = async () => {
      const currentUserEmail = localStorage.getItem("userEmail"); 
      if (!currentUserEmail) return;
      try {
        const userRes = await fetch(`http://localhost:5000/api/user/${currentUserEmail}`);
        const userData = await userRes.json();
        if (userRes.ok && userData?.profilePic) setProfilePic(userData.profilePic); 

        const videoRes = await fetch(`http://localhost:5000/api/videos/${currentUserEmail}`);
        const videoData = await videoRes.json();
        if (videoRes.ok && videoData?.videos) setVideos(videoData.videos); 
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserDataAndVideos();
  }, []); 

  return (
    <div className="relative min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* Custom CSS for the Pop Animation */}
      <style>{`
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.9) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-pop-in { animation: pop-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* --- NEW: FULLSCREEN VIDEO PLAYER MODAL --- */}
      {playingVideo && (
        <div className="fixed inset-0 z-[100] bg-[#09090b] flex flex-col justify-end animate-pop-in">
          
          {/* Close Button */}
          <button 
            onClick={() => setPlayingVideo(null)}
            className="absolute top-6 right-6 z-50 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full transition-all"
          >
            <CloseIcon />
          </button>

          {/* Video Player */}
          <video
            src={playingVideo.videoUrl}
            autoPlay
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Bottom Gradient Overlay (Makes text readable) */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent pointer-events-none" />

          {/* Bottom Interactive Content Area (Matches your screenshot) */}
          <div className="relative z-10 p-6 pb-8 md:pb-12 flex flex-col gap-4 max-w-lg mx-auto w-full">
            
            {/* Text Details */}
            <div>
              <h2 className="text-xl font-bold text-white shadow-sm">@{user.username}</h2>
              <p className="text-sm text-gray-200 mt-1.5 flex items-center gap-2">
                {playingVideo.title} {playingVideo.description && `- ${playingVideo.description}`}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 items-center mt-2">
              <button className="flex-1 py-4 bg-gradient-to-r from-[#d946ef] to-[#a855f7] hover:opacity-90 transition-opacity rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20">
                <SparklesIcon /> Approach
              </button>
              
              <button className="w-14 h-14 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 transition-colors">
                <HeartIcon />
              </button>
            </div>
          </div>
        </div>
      )}


      {/* --- UPLOAD MODAL --- */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#111] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl shadow-purple-500/20">
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400">Video Details</h3>
            <form onSubmit={handleVideoUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                <input 
                  type="text" required value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="E.g., Cinematic flow ⚡"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description (Optional)</label>
                <textarea 
                  value={videoDesc} onChange={(e) => setVideoDesc(e.target.value)}
                  placeholder="Tell your viewers about this vlog..." rows="3"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowUploadModal(false)} className="flex-1 py-3 px-4 rounded-xl font-semibold text-gray-300 bg-white/5 hover:bg-white/10 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/30">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        
        {/* Profile Header */}
        <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 md:space-y-0 md:flex md:items-center md:gap-10 shadow-[0_0_60px_-10px_rgba(168,85,247,0.3)]">
          <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left md:gap-6 md:flex-grow">
            <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0 cursor-pointer group" onClick={() => !isUploadingPic && picInputRef.current?.click()}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-1.5" />
              <img src={profilePic} alt="User DP" className="relative w-full h-full rounded-full object-cover bg-[#0a0a0a] p-1 border-4 border-[#0a0a0a]" />
              <input type="file" accept="image/*" className="hidden" ref={picInputRef} onChange={handleImageUpload} />
            </div>
            <div className="mt-6 md:mt-0 md:flex-grow">
              <h1 className="text-3xl md:text-4xl font-extrabold">{user.username}</h1>
              <p className="text-gray-400 text-sm italic">"Just another creative soul in the digital expanse."</p>
            </div>
          </div>
          <div className="hidden md:block flex-shrink-0">
            <button onClick={() => !isVideoUploading && videoInputRef.current?.click()} disabled={isVideoUploading} className="px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-600 flex items-center gap-3">
              {isVideoUploading ? "Uploading..." : "New Project"}
            </button>
            <input type="file" accept="video/*" className="hidden" ref={videoInputRef} onChange={handleFileSelect} />
          </div>
        </div>

        {/* Mobile Upload */}
        <div className="md:hidden">
          <button onClick={() => !isVideoUploading && videoInputRef.current?.click()} disabled={isVideoUploading} className="relative w-full bg-white/5 border border-white/10 rounded-2xl p-6 group">
            <div className="relative z-10 flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white">{isVideoUploading ? "Uploading..." : "Create New Vlog"}</h3>
                <p className="text-sm text-gray-400">{isVideoUploading ? "Please wait..." : "Tap to upload"}</p>
              </div>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5">
                {isVideoUploading ? <span className="animate-spin w-8 h-8 border-4 border-violet-400 border-t-transparent rounded-full"></span> : <BigPlusIcon />}
              </div>
            </div>
          </button>
          <input type="file" accept="video/*" className="hidden" ref={videoInputRef} onChange={handleFileSelect} />
        </div>

        {/* --- VIDEO GRID --- */}
        <div className="space-y-6 pt-4">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
            Recently Uploaded
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div key={video._id} className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                <div className="aspect-video relative overflow-hidden bg-black/50">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* UPDATED: Play Button Overlay now triggers the Modal */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => setPlayingVideo(video)} 
                      className="w-14 h-14 rounded-full bg-purple-600/30 backdrop-blur-sm flex items-center justify-center border border-purple-400 shadow-[0_0_20px_-2px_rgba(168,85,247,0.8)] hover:scale-110 transition-transform cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white ml-1.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-white leading-tight line-clamp-1" title={video.title}>
                        {video.title}
                      </h3>
                      <button 
                        onClick={() => handleDeleteVideo(video._id)}
                        className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors flex-shrink-0"
                        title="Delete Video"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                    {video.description && (
                      <p className="text-sm text-gray-400 line-clamp-2 mb-3">{video.description}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t border-white/10 pt-3 mt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white/90">{video.likes}</span> Likes
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white/90">{video.views}</span> Views
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreatorProfileGenZ;
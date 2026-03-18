import React from 'react';

// Refined, bolder icon for GenZ style
const BigPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10 text-violet-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const CreatorProfileGenZ = () => {
  // Retaining dummy data but we'll use a premium visual
  const user = {
    username: 'DraxieCreator',
    dp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DraxieGenZ', // Premium avatar
    role: 'Creator',
    totalLikes: '24.5K',
    totalViews: '142K',
  };

  const mockVideos = [
    // Video cards need to stack on mobile and look premium
    { id: 1, title: 'Cinematic Flow', thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop', likes: '1.2K', views: '10K' },
    { id: 2, title: 'Inside My Setup', thumbnail: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=600&auto=format&fit=crop', likes: '850', views: '5K' },
    { id: 3, title: 'Unfiltered Q&A', thumbnail: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=600&auto=format&fit=crop', likes: '3.4K', views: '20K' },
    { id: 4, title: 'Vibe Check ⚡', thumbnail: 'https://images.unsplash.com/photo-1587691597199-2a9f4551df42?q=80&w=600&auto=format&fit=crop', likes: '10K', views: '50K' },
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* Background Radial Glows for Deep GenZ Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-1/4 w-full h-full bg-violet-600/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-full h-full bg-pink-600/10 rounded-full blur-[200px]" />
      </div>

      {/* Main Container - Ensuring Z-index places content above glowing background */}
      <div className="relative z-10 max-w-7xl mx-auto space-y-6">

        {/* Profile Header - Reimagined for Mobile Spacing & Pure GenZ Texture */}
        <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 md:space-y-0 md:flex md:items-center md:gap-10 shadow-[0_0_60px_-10px_rgba(168,85,247,0.3)]">
          
          {/* Avatar and Info Block - Hierarchy Fixed */}
          <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left md:gap-6 md:flex-grow">
            <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0">
              {/* Outer Colorful Glowing Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-1.5 shadow-[0_0_30px_-5px_rgba(168,85,247,0.7)]" />
              <img 
                src={user.dp} 
                alt="User DP" 
                className="relative w-full h-full rounded-full object-cover bg-[#0a0a0a] p-1 border-4 border-[#0a0a0a]"
              />
              {/* Role Badge - Overlayed for depth */}
              <span className="absolute -bottom-1 -right-1 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-white/10 rounded-full text-purple-300 border border-purple-500/30 backdrop-blur-sm shadow-xl">
                {user.role}
              </span>
            </div>
            
            <div className="mt-6 md:mt-0 md:flex-grow">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">{user.username}</h1>
              {/* A classic GenZ component: The italicized sub-header/bio */}
              <p className="mt-1 text-gray-400 text-sm italic">"Just another creative soul in the digital expanse."</p>
            </div>
          </div>

          {/* Engagement Stats - Clean, centered, and color-coded */}
          <div className="flex justify-center md:justify-end gap-6 border-t border-b border-white/10 py-4 md:py-0 md:border-none md:gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
                {user.totalLikes}
              </p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Likes ✨</p>
            </div>
            <div className="w-px h-12 md:h-16 bg-white/10 self-center md:hidden" /> {/* Small divider on mobile */}
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
                {user.totalViews}
              </p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Views 👀</p>
            </div>
          </div>

          {/* Desktop Upload Button - Hidden on mobile */}
          <div className="hidden md:block flex-shrink-0">
            <button className="px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4),0_0_30px_rgba(168,85,247,0.2)] flex items-center gap-3 text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New Project
            </button>
          </div>
        </div>

        {/* mobile Action Button - Highly designed CTA, replacing the basic box */}
        <div className="md:hidden">
          <button className="relative w-full overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-6 group shadow-xl">
            {/* The actual button content */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white">Create New Vlog</h3>
                <p className="text-sm text-gray-400">Tap to upload your next viral hit</p>
              </div>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-pink-500 transition-all duration-300">
                <BigPlusIcon />
              </div>
            </div>
            {/* Hover background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-900 via-purple-900 to-pink-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[10px]" />
          </button>
        </div>

        {/* Content Section - Clear header and stacked mobile cards */}
        <div className="space-y-6 pt-4">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
            Recently Uploaded
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockVideos.map((video) => (
              <div key={video.id} className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 shadow-2xl">
                
                {/* 16:9 Thumbnail - Essential for sensible mobile video */}
                <div className="aspect-video relative overflow-hidden bg-black/50">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Neon play button hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-purple-600/30 backdrop-blur-sm flex items-center justify-center border border-purple-400 shadow-[0_0_20px_-2px_rgba(168,85,247,0.8)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white ml-1.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Video Info - Redesigned text structure */}
                <div className="p-5 flex flex-col justify-between">
                  <h3 className="font-semibold text-lg text-white mb-2 leading-tight">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t border-white/10 pt-3 mt-1">
                    <div className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold text-white/90">{video.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold text-white/90">{video.views}</span>
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
import React from 'react';
import { User, ChevronRight } from 'lucide-react';

const Approaches = () => {
  // Mock data to map through
  const approachesData = [
    { id: 1, user: 'User1', message: "Let's connect 🔥", time: '2m ago', unread: true },
    { id: 2, user: 'User2', message: "Loved your edit!", time: '1h ago', unread: false },
    { id: 3, user: 'User3', message: "Are you open for collaborations?", time: '5h ago', unread: true },
  ];

  return (
    // Deep dark background with a very subtle purple tint
    <div className="min-h-screen bg-[#0a0610] text-white p-5 pb-24 relative overflow-hidden">
      
      {/* Subtle background ambient glow (like the top of your profile page) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-fuchsia-900/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-md mx-auto relative z-10">
        
        {/* Header section matched to your "Recently Uploaded" style */}
        <div className="flex items-center gap-3 mb-6 mt-2">
          {/* The glowing pink dot */}
          <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.8)]"></div>
          <h1 className="text-[22px] font-black tracking-wide text-white">Approaches</h1>
        </div>

        {/* Approaches List */}
        <div className="space-y-4">
          {approachesData.map((item) => (
            <div 
              key={item.id} 
              // Solid dark card with subtle border, matching your "Create New Vlog" card
              className="flex items-center justify-between p-4 rounded-2xl bg-[#15111a] border border-[#2a2432] transition-all duration-300 hover:border-fuchsia-500/40 hover:bg-[#1a1520] cursor-pointer"
            >
              <div className="flex items-center gap-4">
                
                {/* Avatar matching the dark UI */}
                <div className="w-12 h-12 shrink-0 rounded-full bg-[#221c2b] flex items-center justify-center border border-[#332b40] relative">
                  <User size={20} className="text-gray-400" />
                  {/* Unread dot indicator on the avatar */}
                  {item.unread && (
                    <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-fuchsia-500 border-2 border-[#15111a]"></span>
                  )}
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col">
                  <h3 className="font-extrabold text-gray-100 text-[17px] tracking-wide">
                    {item.user}
                  </h3>
                  {/* Italicized subtitle like your profile bio */}
                  <p className="text-[13px] text-gray-400 mt-0.5 italic">
                    "{item.message}"
                  </p>
                </div>
              </div>

              {/* Trailing Action & Time */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-[10px] font-bold tracking-wider text-fuchsia-400/80 uppercase">
                  {item.time}
                </span>
                {/* Small button matching the '+' button on your profile */}
                <div className="w-8 h-8 rounded-xl bg-[#221c2b] flex items-center justify-center transition-colors hover:bg-[#2d2538]">
                  <ChevronRight size={16} className={item.unread ? "text-fuchsia-400" : "text-gray-500"} />
                </div>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Approaches;
import { useState, useEffect } from 'react';

export default function MobileOnlyGuard({ children }) {
  // Check if the screen width is mobile-sized (under 768px)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // Function to update state when the window is resized
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Listen for window resizes
    window.addEventListener('resize', handleResize);
    
    // Cleanup the listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // If it IS a mobile device, render the actual Draxie Verse app normally
  if (isMobile) {
    return children;
  }

  // If it's a DESKTOP, intercept the app and show this aesthetic screen instead
  return (
    <div className="min-h-screen w-full bg-[#0f0f13] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      
      {/* Optional: A subtle glowing background effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="z-10 flex flex-col items-center gap-6 max-w-md">
        {/* Aesthetic Glitch/Bold Title */}
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase">
          Draxie Verse
        </h1>
        
        {/* A minimalist divider line */}
        <div className="w-16 h-1 bg-purple-500 rounded-full"></div>
        
        {/* The requested message, styled elegantly */}
        <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
          Sorry, right now services are available for <span className="text-white font-medium">mobile devices only</span>. 
        </p>
        
        <p className="text-sm text-gray-600 mt-4 uppercase tracking-widest font-semibold">
          Please access via smartphone
        </p>
      </div>
    </div>
  );
}
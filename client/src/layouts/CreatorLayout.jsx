import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function CreatorLayout() {
  return (
    // 1. Lock the entire app to exactly the height of the device screen
    // 2. overflow-hidden prevents the main window from scrolling
    <div className="flex flex-col h-[100dvh] w-full overflow-hidden bg-[#0f0f13]">
      
      {/* 3. The Content Area: flex-1 takes up all remaining space. 
             overflow-y-auto makes ONLY this specific section scrollable! */}
      <main className="flex-1 overflow-y-auto w-full max-w-5xl mx-auto">
        <Outlet />
      </main>

      {/* 4. The Navigation: It is NO LONGER fixed. 
             It takes up physical space at the bottom of the flex container. */}
      <div className="w-full flex-shrink-0 z-50 bg-[#1a1a24]">
        <BottomNav />
      </div>
      
    </div>
  );
}
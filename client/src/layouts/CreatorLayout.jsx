import { Outlet } from 'react-router-dom';
// Assuming you have a BottomNav component based on your folder structure
import BottomNav from '../components/BottomNav'; 

export default function CreatorLayout() {
  return (
    // min-h-[100dvh] ensures it takes the full screen height
    // flex-col stacks children vertically
    <div className="flex flex-col min-h-[100dvh] w-full">
      
      {/* Main Content Area */}
      {/* flex-1 pushes the BottomNav to the bottom, max-w-5xl keeps it from getting too wide on PC */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 pb-24">
        <Outlet />
      </main>

      {/* Navigation - fixed to the bottom on mobile */}
      <div className="fixed bottom-0 w-full md:relative md:w-auto">
        <BottomNav />
      </div>
    </div>
  );
}
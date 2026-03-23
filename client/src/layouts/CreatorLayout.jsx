// 1. Swap 'Routes' and 'Route' for 'Outlet'
import { Outlet } from "react-router-dom"; 
import BottomNav from "../components/BottomNav";

function CreatorLayout() {
  return (
    <div className="h-screen max-w-[430px] mx-auto bg-black text-white relative">
      
      {/* 2. Replace the entire <Routes> block with <Outlet /> */}
      {/* I added a wrapper div with pb-20 so the content doesn't get hidden behind the BottomNav */}
      <div className="h-full w-full overflow-y-auto no-scrollbar pb-20">
        <Outlet />
      </div>

      <BottomNav />
    </div>
  );
}

export default CreatorLayout;
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, User } from 'lucide-react';

const BottomNav = () => {
  // Our class helper stays exactly the same
  const navLinkClasses = ({ isActive }) =>
    `p-2 transition-all duration-300 ${
      isActive 
        ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' 
        : 'text-gray-400 hover:text-gray-200'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50">
      <div className="flex justify-around items-center pb-safe pt-3 px-4 pb-4 
                      bg-white/5 backdrop-blur-lg border-t border-white/10 shadow-lg">
        
        {/* We expose isActive using a function inside the NavLink */}
        <NavLink to="/creator/CreatorHome" className={navLinkClasses}>
          {({ isActive }) => (
            <Home size={28} strokeWidth={isActive ? 2.5 : 2} />
          )}
        </NavLink>

        <NavLink to="/creator/Approaches" className={navLinkClasses}>
          {({ isActive }) => (
            <MessageSquare size={28} strokeWidth={isActive ? 2.5 : 2} />
          )}
        </NavLink>

        <NavLink to="/creator/profile" className={navLinkClasses}>
          {({ isActive }) => (
            <User size={28} strokeWidth={isActive ? 2.5 : 2} />
          )}
        </NavLink>
        
      </div>
    </nav>
  );
};

export default BottomNav;
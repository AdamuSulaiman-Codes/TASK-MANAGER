import { Bell, Settings} from "lucide-react";
import React from "react";
import type { User } from "../Auth/authData";
import { useSelector } from "react-redux";


type RootState = {
  user: {
    user: User | null
  }
};

const NavBar: React.FC = () => {
  const user = useSelector((state : RootState) => state.user.user);
  console.log(user);
  


  return (
    <nav className="w-full bg-gray-100 border-b border-gray-200 px-6 py-3 flex items-center justify-around">
      
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
          TM
        </div>
        <span className="text-xl font-semibold text-gray-800">
          Task Manager
        </span>
      </div>

      {/* Center Navigation */}
      <div className="hidden md:flex items-center gap-10 text-gray-600 font-medium">
        <a href="#" className="hover:text-black transition">
          Dashboard
        </a>
        <a href="#" className="hover:text-black transition">
          Projects
        </a>
        <a href="#" className="hover:text-black transition">
          Team
        </a>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        
        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
        </div>

        {/* Settings */}
        <Settings className="w-5 h-5 text-gray-600 cursor-pointer" />

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">{user?.userName}</p>
            <p className="text-xs text-gray-500">Pro Plan</p>
          </div>

          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
            {user?.userName.slice(0,3)}
          </div>
        </div>

      </div>
    </nav>
  );
};

export default NavBar;
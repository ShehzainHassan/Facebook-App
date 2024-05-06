import React, { useState } from "react";
import SidebarIcon from "./SidebarIcon";
import facebook from "../assets/124010.png";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaUserFriends,
  FaStoreAlt,
  FaDesktop,
  FaCalendarAlt,
  FaClock,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const userName = JSON.parse(sessionStorage.getItem("FirstName"));

  const logoutUser = () => {
    sessionStorage.clear();
    window.history.replaceState(null, "", "/"); 
    window.location.href = "/"; 
  };

  return (
    <div className="p-2 mt-3 max-w-[300px] xl:min-w-[300px]">
      <div>
        <div onClick={() => setShowUserDetails(!showUserDetails)} style={{ cursor: "pointer" }}>
          
          <div className="flex items-center">
            <img src={facebook} alt="Facebook Logo" className="w-12 h-12 rounded-full mr-4"  />
            <p className="text-gray-600 mb-3">{userName}</p>
          </div>
        </div>
        {showUserDetails && (
          <div className="bg-white shadow-md rounded-md p-3 mt-2">
            <Link to={"/home"}>
            <div className="flex items-center mb-2">
              <img src="https://randomuser.me/api/portraits/men/0.jpg" className="w-12 h-12 rounded-full mr-4" alt="User Profile" />
              <p className="text-gray-600 mb-2">{userName}</p>
            </div>
            </Link>
            <Link to="/edit">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Edit Profile
            </button>
            </Link>
          </div>
        )}
        <SidebarIcon Icon={FaUsers} title="Friends" />
        <SidebarIcon Icon={FaUserFriends} title="Groups" />
        <SidebarIcon Icon={FaStoreAlt} title="Marketplace" />
        <SidebarIcon Icon={FaDesktop} title="Watch" />
        <SidebarIcon Icon={FaCalendarAlt} title="Event" />
        <SidebarIcon Icon={FaClock} title="Memories" />
        <div onClick={logoutUser} style={{ cursor: "pointer" }}>
          <SidebarIcon Icon={FaSignOutAlt} title="Logout" />
        </div>
        <SidebarIcon Icon={FaChevronDown} title="See More" />
      </div>
    </div>
  );
};

export default Sidebar;

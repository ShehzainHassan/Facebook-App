import React from "react";
import SidebarIcon from "./SidebarIcon";
import facebook from "../assets/124010.png";
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
  const logoutUser = () => {
    sessionStorage.removeItem("UID");
    window.location.href = "/";
  };
  const userName = JSON.parse(sessionStorage.getItem("FirstName"));

  return (
    <div className="p-2 mt-3 max-w-[300px] xl:min-w-[300px]">
      <div>
        <SidebarIcon src={facebook} title={`Hi ${userName}`} />
        <SidebarIcon Icon={FaUsers} title="Friends" />
        <SidebarIcon Icon={FaUserFriends} title="Groups" />
        <SidebarIcon Icon={FaStoreAlt} title="Marketplace" />
        <SidebarIcon Icon={FaDesktop} title="Watch" />
        <SidebarIcon Icon={FaCalendarAlt} title="Event" />
        <SidebarIcon Icon={FaClock} title="Memories" />
        <SidebarIcon Icon={FaChevronDown} title="See More" />
        <div onClick={logoutUser} style={{ cursor: "pointer" }}>
          <SidebarIcon Icon={FaSignOutAlt} title="Logout" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React from "react";
import PropTypes from "prop-types";
import facebook from "../assets/124010.png";
import { FaFacebook } from "react-icons/fa";

function SidebarIcon({ src, Icon, title }) {
  return (
    <div className="flex items-center space-x-2 p-3 hover:bg-gray-200 ">
      {src && (
        <img
          src={facebook}
          className="rounded-full"
          width={30}
          height={30}
          alt={title}
        />
      )}
      <div className="flex items-center gap-2">
        {Icon && <Icon className={`h-6 w-6 cursor-pointer text-blue-500`} />}
        <p className="hidden sm:inline-flex font-medium">{title}</p>
      </div>
    </div>
  );
}
SidebarIcon.propTypes = {
  src: PropTypes.string,
  Icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
};
export default SidebarIcon;

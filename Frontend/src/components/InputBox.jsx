import React from "react";
import facebook from "../assets/124010.png";
import { FiVideo, FiCamera, FiSmile } from "react-icons/fi";

const InputBox = () => {
  return (
    <div className="mt-10 bg-white rounded-lg shadow-lg border p-4 max-w-screen-sm">
      <div className="flex gap-2 items-center ml-2 rounded-full bg-gray-100 p-2">
        <img
          className="rounded-full"
          width={40}
          height={40}
          src={facebook}
          alt=""
        />
        <input
          className="hidden md:inline-flex bg-transparent ml-2 outline-none placeholder-gray-500 flex-shrink"
          type="text"
          placeholder="What's on your mind?"
          size={44}
        />
      </div>
      <div className="border-b-2 mt-2"></div>
      <div className="flex items-center justify-between p-3">
        <div className="flex gap-2 ">
          <FiVideo className="text-red-500 h-6 w-6 " />
          <p className="text-gray-600">Live Video</p>
        </div>
        <div className="flex gap-2 ">
          <FiCamera className="text-red-500 h-6 w-6" />
          <p className="text-gray-600">Photo/Video</p>
        </div>
        <div className="flex gap-2 ">
          <FiSmile className="text-red-500 h-6 w-6" />
          <p className="text-gray-600">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;

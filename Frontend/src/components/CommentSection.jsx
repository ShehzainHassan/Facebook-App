import React, { useState } from "react";
import PropTypes from "prop-types";
import { BiX } from "react-icons/bi";

const CommentSection = ({ onClose, comments }) => {
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new comment to the existing comments
    if (comment.trim() !== "") {
      comments.push(comment);
      setComment("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white w-96 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Comments</h2>
          <button onClick={onClose}>
            <BiX className="w-6 h-6 text-gray-600 hover:text-red-500 cursor-pointer" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={comment}
            onChange={handleChange}
            placeholder="Type your comment..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 mb-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Submit
          </button>
        </form>
        <div className="mt-4">
          {comments.map((comment, index) => (
            <p key={index} className="border-b border-gray-300 py-2">
              {comment}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

CommentSection.propTypes = {
  onClose: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CommentSection;

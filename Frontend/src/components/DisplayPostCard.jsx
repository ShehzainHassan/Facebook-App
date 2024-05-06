import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaShare } from "react-icons/fa";
import { BiSolidCommentAdd } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import axios from "axios";
import { Button } from "@chakra-ui/react";

const DisplayPostCard = ({
  imageSrc,
  Time,
  caption,
  postImage,
  Likes,
  Comments,
  Shares,
  postId,
}) => {
  const [likes, setLikes] = useState(Likes);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [shares, setShares] = useState(Shares);
  const userID = JSON.parse(sessionStorage.getItem("UID"));
  const userName = JSON.parse(sessionStorage.getItem("FirstName"));

  const handleLike = () => {
    if (isLiked) {
      setLikes((prevLikes) => prevLikes - 1);
    } else {
      setLikes((prevLikes) => prevLikes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    axios
      .get(`http://localhost:3000/getComments?uid=${userID}&postId=${postId}`)
      .then((response) => {
        setComments(response.data);
        console.log(comments);
      })
      .catch((error) => {
        console.error(error);
      });

    setShowComments(true);
  };

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };
  console.log("Comments:", comments);

  const deleteComment = (commentId) => {
    axios
      .delete(
        `    http://localhost:3000/deleteComment?uid=${userID}&postId=${postId}&commentId=${commentId}`
      )
      .then(() => {
        handleComment();
      });
  };
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (commentText.trim() !== "") {
      axios
        .post("http://localhost:3000/writeComment", {
          userInfo: userID,
          postId: postId,
          comment: commentText,
          commentor: userName,
        })
        .then((response) => {
          console.log(response);
          console.log("User ID: ", userID),
            console.log("Post ID: ", postId),
            console.log("Comment: ", commentText),
            console.log("Commentor: ", userName);
          setCommentText("");
          handleComment();
        })
        .catch((err) => {
          console.error("Error adding comment", err);
        });
    }
  };

  const handleShare = () => {
    setShares((prevShares) => prevShares + 1);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-md">
      {/* Post Header */}
      <div className="flex items-center mb-4">
        <img src={imageSrc} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <p className="text-gray-500 text-xs">{Time}</p>
        </div>
      </div>

      {/* Post Caption */}
      <p className="mb-4 text-lg">{caption}</p>

      {/* Post Image */}
      {postImage && (
        <img src={postImage} alt="Post" className="mb-4 rounded-lg w-full" />
      )}

      {/* Post Actions */}
      <div className="flex justify-between items-center">
        {/* Like Button */}
        <div
          className={`flex items-center space-x-2 text-gray-500 hover:text-blue-500 cursor-pointer ${
            isLiked && "text-red-500"
          }`}
          onClick={handleLike}>
          <AiFillLike className="w-6 h-6" />
          <span className="text-sm">{likes}</span>
        </div>

        {/* Comment Button */}
        <div
          className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 cursor-pointer"
          onClick={handleComment}>
          <span className="text-gray-600">Comments</span>{" "}
          <span className="text-sm">{comments.length}</span>
        </div>

        {/* Share Button */}
        <div
          className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 cursor-pointer"
          onClick={handleShare}>
          <FaShare className="w-6 h-6" />
          <span className="text-sm">{shares}</span>
        </div>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mt-4">
          <form onSubmit={handleSubmitComment} className="flex">
            <input
              type="text"
              value={commentText}
              onChange={handleChange}
              placeholder="Add a comment..."
              className="borderc rounded-md px-2 py-1 mr-2 w-full"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition duration-300">
              Submit
            </button>
          </form>
          <div className="mt-4">
            {!!comments &&
              comments?.map((comment, index) => (
                <div
                  key={index}
                  className="mb-3 rounded-lg border border-gray-300 p-4 flex items-start">
                  <div className="flex-grow">
                    <p className="text-gray-600 font-semibold mb-0">
                      {comment?.author}
                    </p>
                    <p className="text-gray-700 mb-2">{comment?.content}</p>
                  </div>
                  <Button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                    size="sm"
                    colorScheme="red"
                    className="ml-2">
                    Delete
                  </Button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

DisplayPostCard.propTypes = {
  imageSrc: PropTypes.string,
  caption: PropTypes.string.isRequired,
  postImage: PropTypes.string,
};

export default DisplayPostCard;

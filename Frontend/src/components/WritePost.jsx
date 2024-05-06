import React, { useEffect, useState } from "react";
import DisplayPostCard from "./DisplayPostCard";
import axios from "axios";

const WritePost = () => {
  const userID = JSON.parse(sessionStorage.getItem("UID"));
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios
      .get(`http://localhost:3000/getPost?uid=${userID}`)
      .then((response) => {
        setPosts(response.data);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  console.log("Post", posts);

  const [newPost, setNewPost] = useState({
    name: "",
    time: "just now",
    caption: "",
    likes: 0,
    comments: 0,
    shares: 0,
  });
  const addNewPost = () => {
    console.log("add new post");
    axios
      .post("http://localhost:3000/writePost", {
        userInfo: userID,
        post: newPost.caption,
      })
      .then((response) => {
        getPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deletePost = (id) => {
    axios
      .delete(
        `http://localhost:3000/deletePost?userInfo=${userID}&postId=${id}`
      )
      .then((response) => {
        setPosts(posts.filter((post) => post.id != id));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [showForm, setShowForm] = useState(false); // State to toggle form display

  const getRandomImage = () => {
    // Generate a random number to fetch a new profile picture
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    return `https://randomuser.me/api/portraits/men/${randomNumber}.jpg`;
  };

  const addPost = () => {
    setShowForm(false); // Hide form after posting
    addNewPost();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="mt-5 max-w-screen-sm">
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 p-2 bg-green-500 text-white rounded">
        Create Post
      </button>
      {showForm && (
        <div className="mb-4">
          {/* <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={newPost.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          /> */}
          <input
            type="text"
            name="caption"
            placeholder="What's on your mind?"
            value={newPost.caption}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={addPost}
            className="p-2 bg-blue-500 text-white rounded">
            Post
          </button>
        </div>
      )}
      {!!posts &&
        posts?.map((post, index) => {
          console.log("POST:", post);
          return (
            <div key={post?.id}>
              <DisplayPostCard
                imageSrc={`https://randomuser.me/api/portraits/men/${index}.jpg`}
                time={post?.time}
                caption={post?.content}
                likes={post?.likes}
                comments={post?.comments}
                shares={post?.shares}
                postId={post?.id}
              />
              <button
                onClick={() => {
                  deletePost(post?.id);
                }}
                className="mb-2 p-1 bg-red-500 text-white rounded">
                Delete Post
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default WritePost;

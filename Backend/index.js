"use strict";

const firebaseAuth = require("firebase/auth");
const firebaseApp = require("firebase/app");
const firebaseDatabase = require("firebase/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const URL = require("url");
var express = require("express");
var app = (module.exports = express());
app.use(cors());
const jsonParser = bodyParser.json({ limit: "50mb" });

const firebaseConfig = {
  apiKey: "AIzaSyCtv9SmrM6qvRAPKKwSn_QoOYIghej9j24",
  authDomain: "dummy-58726.firebaseapp.com",
  databaseURL: "https://dummy-58726-default-rtdb.firebaseio.com",
  projectId: "dummy-58726",
  storageBucket: "dummy-58726.appspot.com",
  messagingSenderId: "724253078787",
  appId: "1:724253078787:web:a399ffe399278c17ee2536",
};

firebaseApp.initializeApp(firebaseConfig);

const database = firebaseDatabase.getDatabase();
const { ref, get, child, set } = firebaseDatabase;

const userRef = ref(database, "users");

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/login", jsonParser, async function (req, res) {
  const { emailOrPhoneNo, pass } = req.body;
  console.log("Email: ", emailOrPhoneNo);
  console.log("Pass: ", pass);

  firebaseAuth
    .signInWithEmailAndPassword(firebaseAuth.getAuth(), emailOrPhoneNo, pass)
    .then(async (response) => {
      console.log("Response 1: ", response.user.uid);
      const uid = response.user.uid;
      const userInstance = child(userRef, uid);
      const snapshot = await get(userInstance);

      if (snapshot.exists()) {
        res.status(200).send({
          uid,
          firstName: snapshot.val().firstName,
        });
      } else {
        res.status(400).send("Error logging in");
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(403).send(error.code);
    });
});
app.post("/signUp", jsonParser, async function (req, res) {
  const { firstName, lastName, emailOrPhoneNo, pass, dob, isFemale } = req.body;
  firebaseAuth
    .createUserWithEmailAndPassword(
      firebaseAuth.getAuth(),
      emailOrPhoneNo,
      pass
    )
    .then(async (response) => {
      const uid = response.user.uid;
      console.log("ID:", uid);
      const userInstance = child(userRef, uid);
      const snapshot = await get(userInstance);

      const payload = {
        firstName,
        lastName,
        emailOrPhoneNo,
        dob,
        isFemale,
      };

      console.log("Exists:", snapshot.exists(), payload);

      if (!snapshot.exists()) {
        await set(userInstance, payload);
      }

      return res.status(201).send("User created successfully");
    })
    .catch((error) => {
      console.log("ERROR", error);
      return res.status(403).send(error);
    });
});
app.get("/getPost", jsonParser, async function (req, res) {
  const query = URL.parse(req.url, true).query;
  const uid = query.uid;
  const userInstance = child(userRef, uid);
  const snapshot = await get(userInstance);

  if (snapshot.exists()) {
    const userData = snapshot.val();
    res.status(200).send(userData.posts);
  } else {
    res.status(400).send("User not found");
  }
});
app.post("/writePost", jsonParser, async function (req, res) {
  const { userInfo, post } = req.body;
  console.log(req.body);

  const userInstance = child(userRef, userInfo);
  const snapshot = await get(userInstance);

  if (snapshot.exists()) {
    const userData = snapshot.val();
    console.log("Data:", userData);

    if (userData.hasOwnProperty("posts")) {
      userData.posts.push({ id: Date.now(), content: post });
    } else {
      userData.posts = [{ id: Date.now(), content: post }];
    }

    set(userInstance, userData);

    res.status(200).send("Ok");
  } else {
    res.status(400).send("No user found");
  }
});
app.delete("/deletePost", jsonParser, async function (req, res) {
  const query = URL.parse(req.url, true).query;
  const userInfo = query.userInfo;
  const postId = query.postId;
  console.log("User Info: ", userInfo);
  console.log("Post id: ", postId);

  const userInstance = child(userRef, userInfo);
  const snapshot = await get(userInstance);

  try {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const filteredPosts = userData.posts.filter(
        (post) => post.id.toString() !== postId.toString()
      );

      console.log("Filtered posts", filteredPosts);

      userData.posts = filteredPosts;
      set(userInstance, userData);

      res.status(200).send("Deleted successfully");
    } else {
      res.status(400).send("Post not found");
    }
  } catch (error) {
    res.status(400).send(error.json());
  }
});

app.get("/getComments", jsonParser, async function (req, res) {
  const query = URL.parse(req.url, true).query;
  const uid = query.uid;
  const postId = query.postId;
  const userInstance = child(userRef, uid);
  const userPosts = child(userInstance, "posts");
  const snapshot = await get(userPosts);

  if (snapshot.exists()) {
    const userPostsData = snapshot.val();
    const postIndex = userPostsData.findIndex(
      (post) => post.id.toString() === postId.toString()
    );
    res.status(200).send(userPostsData?.[postIndex]?.comments);
  } else {
    res.status(400).send("User not found");
  }
});
app.post("/writeComment", jsonParser, async function (req, res) {
  const { userInfo, postId, comment, commentor } = req.body;
  console.log(req.body);

  const userInstance = child(userRef, userInfo);

  const snapshot = await get(userInstance);

  try {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const activePost = userData.posts.filter(
        (post) => post.id.toString() === postId.toString()
      )?.[0];
      console.log("Data:", activePost);

      if (activePost?.hasOwnProperty("comments")) {
        console.log("If");

        activePost.comments.push({
          id: Date.now(),
          content: comment,
          author: commentor,
        });
      } else {
        console.log("Else");
        activePost.comments = [
          { id: Date.now(), content: comment, author: commentor },
        ];
      }

      console.log("Active post:", activePost);

      const activePostIndex = userData.posts.findIndex(
        (post) => post.id.toString() === postId.toString()
      );
      userData.posts[activePostIndex] = activePost;

      console.log("Final data:", JSON.stringify(userData));

      set(userInstance, userData);

      res.status(200).send("Ok");
    } else {
      res.status(400).send("No user found");
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(400).send(error);
  }
});

app.delete("/deleteComment", jsonParser, async function (req, res) {
  const query = URL.parse(req.url, true).query;
  const userInfo = query.uid;
  const postId = query.postId;
  const commentId = query.commentId;
  console.log("User Info: ", userInfo);
  console.log("Post id: ", postId);
  console.log("Comment id: ", commentId);

  const userInstance = child(userRef, userInfo);
  const userPostInstance = child(userInstance, "posts");
  const snapshot = await get(userPostInstance);

  try {
    if (snapshot.exists()) {
      const userPosts = snapshot.val();
      console.log("All posts of user:", JSON.stringify(userPosts));
      const userPost = userPosts.filter(
        (post) => String(post.id) == String(postId)
      )?.[0];
      const postIndex = userPosts.findIndex(
        (post) => post.id.toString() === postId.toString()
      );
      console.log("This post:", userPost);
      const filteredComments = userPost.comments.filter(
        (comment) => comment.id.toString() != commentId.toString()
      );
      userPost.comments = filteredComments;

      console.log("Post Index", postIndex);

      userPosts[postIndex] = userPost;

      console.log("After deletion", userPosts);

      set(userPostInstance, userPosts);

      res.status(200).send("Deleted successfully");
    } else {
      res.status(400).send("Post not found");
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(400).send(JSON.stringify(error));
  }
});
if (!module.parent) {
  app.listen(3000);
  console.log("Express started on port 3000");
}

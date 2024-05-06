import "./App.css";
import React from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import AppLayout from "./pages/AppLayout";
import EditProfilePage from "./pages/EditProfile";
import MessagePage from "./pages/Msg";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<AppLayout />} />
        <Route path="/edit" element={<EditProfilePage />} />
        <Route path="/msg" element={<MessagePage/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

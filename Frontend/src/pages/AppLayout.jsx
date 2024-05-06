import "../pages/AppLayout.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";
import { Link, useNavigate } from "react-router-dom";
// import Login from "./components/Login";

function AppLayout() {
  return (
    <>
      {/* <Login />; */}
      <Navbar />
      <main className="flex bg-gray-100">
        {/* sidebar */}
        <Sidebar />
        {/* feed */}
        <Home />
        {/*  <Link to={"/"}>    for logging out
        </Link> */}
      </main>
    </>
  );
}

export default AppLayout;
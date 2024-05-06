import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MessagePage = () => {
  const [messages, setMessages] = useState([
    { text: "Hello there!", sender: "John", time: "11:30 AM" },
    { text: "Hi! How are you?", sender: "You", time: "11:32 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleMessageSend = () => {
    if (newMessage.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const newMessageObj = {
        text: newMessage,
        sender: "You",
        time: currentTime,
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage("");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex justify-center items-center bg-gray-100">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/0.jpg"
                  alt="User"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <h1 className="text-lg font-bold">John Doe</h1>
              </div>
              <button className="text-blue-500">Settings</button>
            </div>
            {/* Messages */}
            <div className="overflow-y-auto max-h-96">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-${
                    message.sender === "You" ? "end" : "start"
                  } mb-4`}
                >
                  <div
                    className={`${
                      message.sender === "You"
                        ? "bg-gray-200"
                        : "bg-blue-500 text-white"
                    } rounded-lg p-2 max-w-xs`}
                  >
                    {message.text}
                  </div>
                  <span className="text-sm text-gray-500 mt-1">
                    {message.time}
                  </span>
                </div>
              ))}
            </div>
            {/* Message input */}
            <div className="border-t mt-4 pt-4">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                onClick={handleMessageSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;

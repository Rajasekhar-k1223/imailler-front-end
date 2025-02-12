import React, { useState } from "react";
import { Input, Button, Card, Avatar } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css"; // Ant Design styles

const { TextArea } = Input;

function ChatLayout_old_popup() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");

  // Handle sending a message
  const sendMessage = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, { id: Date.now(), text: inputValue, sender: "user" }]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: "I'm here to assist you!", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <Card
        title="Chatbox"
        className="w-75 shadow-lg"
        style={{ maxWidth: "500px", borderRadius: "10px" }}
      >
        {/* Chat Messages */}
        <div className="chat-messages" style={{ maxHeight: "300px", overflowY: "auto", paddingBottom: "10px" }}>
          {messages.map((msg) => (
            <div key={msg.id} className={`d-flex ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"} my-2`}>
              {msg.sender === "bot" && (
                <Avatar size="small" icon={<UserOutlined />} className="me-2" />
              )}
              <div className={`p-2 ${msg.sender === "user" ? "bg-primary text-white" : "bg-light text-dark"} rounded`} style={{ maxWidth: "70%" }}>
                {msg.text}
              </div>
              {msg.sender === "user" && (
                <Avatar size="small" icon={<UserOutlined />} className="ms-2" />
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="d-flex">
          <TextArea
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            onPressEnter={sendMessage}
            className="me-2"
          />
          <Button type="primary" icon={<SendOutlined />} onClick={sendMessage} />
        </div>
      </Card>
    </div>
  );
}

export default ChatLayout_old_popup;

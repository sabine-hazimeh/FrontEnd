import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronRight, FaPaperPlane, FaSearch } from "react-icons/fa";
import "./style.css";

function Chats() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        setUsers(response.data.users);
      } catch (error) {
        console.error("There was an error fetching the users!", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://127.0.0.1:8000/api/chats/messages/${selectedUser.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMessages(response.data);
        } catch (error) {
          console.error("There was an error fetching messages!", error);
        }
      };

      fetchMessages();
    }
  }, [selectedUser]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = async () => {
    if (messageText.trim() === "" || !selectedUser) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:8000/api/chats",
        {
          receiver_id: selectedUser.id,
          message: messageText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessageText("");

      const response = await axios.get(
        `http://127.0.0.1:8000/api/chats/messages/${selectedUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("There was an error sending the message!", error);
    }
  };

  return (
    <div className="chat-container">
      <ul className="user-list">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for users here"
            className="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        {users
          .filter((user) =>
            user.name.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((user) => (
            <li
              key={user.id}
              className="users"
              onClick={() => handleUserClick(user)}
            >
              {user.name} <FaChevronRight className="arrow-icon" />
            </li>
          ))}
      </ul>
      {selectedUser && (
        <div className="chat-area">
          <div className="message-list">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${
                  msg.sender_id === selectedUser.id ? "received" : "sent"
                }`}
              >
                {msg.message}
              </div>
            ))}
          </div>
          <div className="message-input">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Write your messages here"
            />
            <button onClick={handleSendMessage} className="send-button">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chats;

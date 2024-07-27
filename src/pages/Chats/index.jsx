import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronRight } from "react-icons/fa";
import "./style.css";

function Chats() {
  const [users, setUsers] = useState([]);

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

  return (
    <div className="chat-container">
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="users">
            {user.name} <FaChevronRight className="arrow-icon" />
          </li>
        ))}
      </ul>
      <div className="chat-area">
        <div className="message-input">
          <input type="text" placeholder="Write your messages here" />
        </div>
      </div>
    </div>
  );
}

export default Chats;

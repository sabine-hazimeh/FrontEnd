import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/admin/users`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="admin-page">
        <div className="users-container">
          <button> Add new Users</button>
          <ul>
            {users.map((user) => (
              <li className="users" key={user.id}>
                {user.name}
                <small>{user.email}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Admin;

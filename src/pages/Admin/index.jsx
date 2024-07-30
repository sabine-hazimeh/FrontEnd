import React, { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

function Admin() {
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);
  const [fileKey, setFileKey] = useState(Date.now());

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    // toast.success("Users have been inserted successfully!");
    if (file) {
      const fileType = file.name.split(".").pop();
      let data = [];

      if (fileType === "csv") {
        Papa.parse(file, {
          complete: (result) => {
            if (result.data.length > 0 && typeof result.data[0] === "object") {
              data = result.data;
              processRows(data);
            } else {
              console.error("CSV parsing error: Unexpected data format");
            }
          },
          header: true,
        });
      } else if (fileType === "xlsx") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const workbook = XLSX.read(e.target.result, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          data = XLSX.utils.sheet_to_json(worksheet);
          processRows(data);
        };
        reader.readAsArrayBuffer(file);
      }

      setFile(null);
      setFileKey(Date.now());
    }
  };

  const processRows = async (rows) => {
    try {
      for (let row of rows) {
        const { name, email, password } = row;
        await axios.post("http://127.0.0.1:8000/api/register", {
          name,
          email,
          password,
        });
      }
    } catch (error) {
      console.error("Error importing user:", error);
    }
  };

  return (
    <>
      <div className="admin-page">
        <div className="users-container">
          <input
            key={fileKey}
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <button
            className="file-button"
            onClick={() => document.querySelector('input[type="file"]').click()}
          >
            Choose File
          </button>
          <button className="button" onClick={handleFileUpload}>
            Upload Users
          </button>

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
      <ToastContainer />
    </>
  );
}

export default Admin;

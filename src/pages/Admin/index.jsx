import React, { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaExclamationTriangle } from "react-icons/fa";
import "./style.css";

function Admin() {
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);
  const [fileKey, setFileKey] = useState(Date.now());
  const [error, setError] = useState(null);

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
        setError("Error fetching users. Only admin can see this page.");
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
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
    let allSuccess = true;
    try {
      for (let row of rows) {
        const { name, email, password } = row;

        if (!name || !email || !password) {
          console.error("Validation error: Missing required fields", row);
          allSuccess = false;
          continue;
        }

        try {
          await axios.post("http://127.0.0.1:8000/api/register", {
            name,
            email,
            password,
          });
        } catch (error) {
          allSuccess = false;
          if (error.response) {
            console.error("Error importing user:", error.response.data);
          } else {
            console.error("Error importing user:", error.message);
          }
        }
      }

      if (allSuccess) {
        toast.success("Users added successfully");
      } else {
        toast.error("Some users were not added.");
      }
    } catch (error) {
      console.error("Error processing rows:", error);
      toast.error("An error occurred while processing the file.");
    }
  };

  return (
    <>
      <div className="admin-page">
        <div className="users-container">
          {!error && (
            <>
              <input
                key={fileKey}
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <button
                className="file-button"
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
              >
                Choose File
              </button>
              <button className="button" onClick={handleFileUpload}>
                Upload Users
              </button>
            </>
          )}

          {error ? (
            <div className="error-message">
              <FaExclamationTriangle size={50} />
              <p>{error}</p>
            </div>
          ) : (
            <ul>
              {users.map((user) => (
                <li className="users" key={user.id}>
                  {user.name}
                  <small>{user.email}</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Admin;

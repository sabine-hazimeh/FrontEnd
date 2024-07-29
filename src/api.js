import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

// -------------------------------------------------

// src/api/axiosConfig.js
// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'https://your-backend-url.com/api', // Replace with your backend URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default axiosInstance;
// -------------------------------------------------

export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};

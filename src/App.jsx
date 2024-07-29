import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Chats from "./pages/Chats";
import * as React from "react";
import { ChakraProvider, Box, Code, theme } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import Header from "./Component/Header";
// import React from 'react';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signUp" element={<SignUp />} />
//         <Route path="/chats" element={<Chats />} />
//         <Route path="/code" element={<Code />} />
//         <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}><CodeEditor /></Box>
//       </Routes>
//     </Router>

//   );
// }

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
          <Routes>
            <Header />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/code" element={<CodeEditor />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

// function App() {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signUp" element={<SignUp />} />
//         <Route path="/chats" element={<Chats />} />
//       </Routes>
//     </Router>
//   );
// }

export default App;

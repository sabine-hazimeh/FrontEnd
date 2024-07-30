import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Chats from "./pages/Chats";
import Header from "./components/Header";
import Code from "./pages/Code";
import PrivateRoute from "./components/PrivateRoute";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />

        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/code" element={<Code />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

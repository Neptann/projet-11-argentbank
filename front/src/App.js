import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./assets/pages/home/home";
import Login from "./assets/pages/login/login";
import User from "./assets/pages/user/user";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="*" />
    </Routes>
  );
}

export default App;

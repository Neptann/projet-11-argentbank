import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./assets/pages/home/home";
import Login from "./assets/pages/login/login";
import User from "./assets/pages/user/user";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="user" element={<User />} />
        <Route path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

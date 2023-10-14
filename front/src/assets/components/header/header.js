import "../header/header.css";
import logo from "../../images/argentBankLogo.png";
import { Link } from "react-router-dom";

function Header() {
  const authUser = JSON.parse(localStorage.getItem("body"));
  const authToken = JSON.parse(localStorage.getItem("token"));
  const handleSignOut = () => {
    const keysToDelete = ["body", "token"];
    keysToDelete.forEach((key) => {
      localStorage.removeItem(key);
    });
  };
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to={"/"}>
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="connection">
        {authUser ? (
          <Link to={"/user"} className="main-nav-item">
            <i className="fa-regular fa-circle-user"></i>
            <span>{authUser.firstName}</span>
          </Link>
        ) : (
          <Link to={"/login"} className="main-nav-item">
            <i className="fa-regular fa-circle-user"></i>
            <span>Sign In</span>
          </Link>
        )}
        {authToken ? (
          <Link onClick={handleSignOut} to={"/"} className="main-nav-item">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Sign Out</span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}

export default Header;

import "../header/header.css";
import logo from "../../images/argentBankLogo.png";
import { Link } from "react-router-dom";
import { updateUser } from "../../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateTokenBy } from "../../../features/token/tokenSlice";

function Header() {
  const user = useSelector((state) => state.user.value);
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(updateTokenBy(null));
    dispatch(updateUser(null));
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
        {user ? (
          <Link to={"/user"} className="main-nav-item">
            <i className="fa-regular fa-circle-user"></i>
            <span>{user.userName}</span>
          </Link>
        ) : (
          <Link to={"/login"} className="main-nav-item">
            <i className="fa-regular fa-circle-user"></i>
            <span>Sign In</span>
          </Link>
        )}
        {token ? (
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

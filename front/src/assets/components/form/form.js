import { Link } from "react-router-dom";
import "../form/form.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTokenBy } from "../../../features/token/tokenSlice";
import { updateUser } from "../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { updateEmail } from "../../../features/saveEmail/saveEmailSlice";

function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [token, setToken] = useState(null);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const token = useSelector((state) => state.token.value);
  const savedEmail = useSelector((state) => state.mail.value);

  useEffect(() => {
    console.log(token);
    if (token === null) {
      return;
    }
    console.log("Token stocké dans le localStorage :", token);
    const optionsProfile = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    };
    fetch("http://127.0.0.1:3001/api/v1/user/profile", optionsProfile)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200 && data.body) {
          dispatch(updateUser(data.body));

          // localStorage.setItem("body", JSON.stringify(data.body));
          // console.log("Données stockées :", data.body);

          navigate("/user");
        }
      });
  }, [token, dispatch, navigate]);

  // Récupérer l'e-mail du localStorage lors du chargement initial de la composante
  useEffect(() => {
    if (savedEmail) {
      setUserEmail(savedEmail);
      setRememberMe(true);
    }
  }, [savedEmail]);

  // Gérer le changement d'état de la case "Remember me"
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
    if (e.target.checked) {
      dispatch(updateEmail(userEmail));
    } else {
      dispatch(updateEmail(null));
    }
  };

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      password: password,
    }),
  };

  const postLogin = () => {
    fetch("http://127.0.0.1:3001/api/v1/user/login", options)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200 && data.body && data.body.token) {
          const authToken = data.body.token;

          dispatch(updateTokenBy(authToken));

          setLoggedIn(true);
        } else if (
          data.status === 400 ||
          data.status === 401 ||
          data.status === 404
        ) {
          // console.error("Erreur lors de la connexion :", data.message);
          setError(<span>Mauvais identifiants !</span>);
          setTimeout(() => setError(""), 5000);
          return;
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
        {loggedIn ? ( // Si l'utilisateur est connecté
          // <video className="loading" src={loading} autoPlay loop muted />
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <Link onClick={postLogin} className="sign-in-button">
            Sign In
          </Link>
        )}
        {/* <!-- SHOULD BE THE BUTTON BELOW --> */}
        {/* <!-- <button className="sign-in-button">Sign In</button> --> */}
        {/* <!--  --> */}
        {error ? <p className="errorMessage">{error}</p> : null}
      </form>
    </section>
  );
}

export default Form;

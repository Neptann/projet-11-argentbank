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
  const dispatch = useDispatch(); // hook pour manipuler store.

  // initialise les états
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // stock booléen si email mémorisé.
  const [loggedIn, setLoggedIn] = useState(false); // stock booléen si utilisateur connecté.

  // extrait données du Redux store.
  const token = useSelector((state) => state.token.value);
  const savedEmail = useSelector((state) => state.mail.value);

  useEffect(() => {
    console.log(token);
    if (token === null) {
      return; // ne fait rien.
    }
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
    fetch("http://127.0.0.1:3001/api/v1/user/profile", optionsProfile) // effectue une requête.
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200 && data.body) {
          dispatch(updateUser(data.body));

          navigate("/user");
        }
      });
  }, [token, dispatch, navigate]);

  // Récupère e-mail du localStorage
  useEffect(() => {
    if (savedEmail) {
      setUserEmail(savedEmail);
      setRememberMe(true);
    }
  }, [savedEmail]);

  // Etat remember me
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
          const authToken = data.body.token; // extrait le token des données renvoyées.

          dispatch(updateTokenBy(authToken)); // stocke le token dans redux.

          setLoggedIn(true);
        } else if (
          data.status === 400 ||
          data.status === 401 ||
          data.status === 404
        ) {
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
        {loggedIn ? ( // Si connecté
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
        {error ? <p className="errorMessage">{error}</p> : null}
      </form>
    </section>
  );
}

export default Form;

import { Link } from "react-router-dom";
import "../form/form.css";
import { useState } from "react";

function Form() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      // "User-Agent": "insomnia/8.1.0",
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

          setToken(authToken); // Le token en local.

          localStorage.setItem("token", JSON.stringify(authToken));
          console.log("Token stocké :", authToken);
          console.log(data);

          // window.location.href = "/user";
          const storedToken = JSON.parse(localStorage.getItem("token"));
          if (storedToken) {
            console.log("Token stocké dans le localStorage :", storedToken);
            const optionsProfile = {
              method: "POST",
              headers: {
                Authorization: `Bearer ${storedToken}`,
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
                  const authUser = data.body;

                  setToken(authUser);

                  localStorage.setItem("body", JSON.stringify(authUser));
                  console.log("Données stockées :", authUser);
                }
              });
          } else {
            console.log("Aucun token n'est stocké dans le localStorage");
          }
        } else if (data.status == 401 || data.status == 404) {
          // console.error("Erreur lors de la connexion :", data.message);
          console.error("Mauvais identifiants !");
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
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
        <Link onClick={postLogin} className="sign-in-button">
          Sign In
        </Link>
        {/* <!-- SHOULD BE THE BUTTON BELOW --> */}
        {/* <!-- <button className="sign-in-button">Sign In</button> --> */}
        {/* <!--  --> */}
      </form>
    </section>
  );
}

export default Form;

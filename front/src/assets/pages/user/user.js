import "../user/user.css";
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import Transaction from "../../components/transaction/transaction";
import Footer from "../../components/footer/footer";
import Error from "../error/error";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../features/user/userSlice";

function User() {
  // const authUser = JSON.parse(localStorage.getItem("body"));
  const token = useSelector((state) => state.token.value);
  const authToken = token;

  // const [authUser, setAuthUser] = useState(
  //   JSON.parse(localStorage.getItem("body"))
  // );
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [newUsername, setNewUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  function callUpdateUser() {
    if (
      newUsername.length < 3 ||
      /[^A-Za-z]/.test(newUsername) ||
      /\d/.test(newUsername)
    ) {
      setErrorMessage(
        <span>
          L'utilisateur doit avoir un nom d'au moins 3 lettres, <br /> sans
          caractères spéciaux ni chiffres.
        </span>
      );
      // Effacer le message d'erreur après 5 secondes
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    const optionsUsername = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        // "User-Agent": "insomnia/8.1.0",
      },
      body: JSON.stringify({
        userName: newUsername,
      }),
    };

    fetch("http://127.0.0.1:3001/api/v1/user/profile", optionsUsername)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          // setAuthUser(data.body);
          dispatch(updateUser(data.body));
          // localStorage.setItem("body", JSON.stringify(data.body));
        }
      });
  }

  useEffect(() => {
    // Effacer le message d'erreur après 5 secondes (effacement en douceur)
    const timer = setTimeout(() => {
      if (errorMessage) {
        setErrorMessage("");
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage]);

  // Fonction pour gérer le clic sur le bouton "Edit Name"
  function handleEditNameClick() {
    setIsFormVisible(!isFormVisible);
  }

  return (
    <>
      {token ? (
        <div>
          <Header />
          <div className="container">
            <main className="transaction">
              <h1 className="welcome">
                Welcome back
                <br />
                {user?.userName}
              </h1>
              <Button title={"Edit Username"} onClick={handleEditNameClick} />
              {isFormVisible && (
                <div className="formContainer">
                  <form className="editName">
                    <input
                      type="text"
                      id="username"
                      placeholder="new username"
                      onChange={(e) => {
                        setNewUsername(e.target.value);
                      }}
                    ></input>
                    <button
                      className="buttonOk"
                      onClick={(e) => {
                        e.preventDefault();
                        callUpdateUser();
                      }}
                    >
                      Ok
                    </button>
                  </form>
                  {errorMessage && (
                    <p className="errorMessage">{errorMessage}</p>
                  )}
                </div>
              )}
              <Transaction />
            </main>
          </div>
          <Footer />
        </div>
      ) : (
        <Error />
      )}
    </>
  );
}

export default User;

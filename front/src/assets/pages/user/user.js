import "../user/user.css";
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import Transaction from "../../components/transaction/transaction";
import Footer from "../../components/footer/footer";
import Error from "../error/error";

function User() {
  const authToken = JSON.parse(localStorage.getItem("token"));
  return (
    <>
      {authToken ? (
        <div>
          <Header />
          <div className="container">
            <main className="transaction">
              <h1 className="welcome">
                Welcome back
                <br />
                "user"
              </h1>
              <Button title={"Edit Name"} />
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

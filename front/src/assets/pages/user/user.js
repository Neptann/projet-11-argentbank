import "../user/user.css";
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import Footer from "../../components/footer/footer";

function User() {
  return (
    <>
      <Header />
      <div className="container">
        <main className="transaction">
          <h1 className="welcome">
            Welcome back
            <br />
            "user"
          </h1>
          <Button />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default User;

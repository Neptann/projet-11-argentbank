import "../error/error.css";
import { Link } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

function Error() {
  return (
    <>
      <Header />
      <section className="error">
        <h1>Oups, il y a une erreur !</h1>
        <Link className="home-link" to={"/"}>
          Page d'acceuil
        </Link>
      </section>
      <Footer />
    </>
  );
}

export default Error;

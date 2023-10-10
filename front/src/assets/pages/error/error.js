import "../error/error.css";
import { Link } from "react-router-dom";

function Error() {
  return (
    <section>
      <h1>Oups, il y a une erreur !</h1>
      <Link to={"/"}>Page d'acceuil</Link>
    </section>
  );
}

export default Error;

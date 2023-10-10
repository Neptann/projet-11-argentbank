import "../home/home.css";
import Header from "../../components/header/header";
import Banner from "../../components/banner/banner";
import Feature from "../../components/feature/feature.js";
import Footer from "../../components/footer/footer";

function Home() {
  const storedToken = JSON.parse(localStorage.getItem("token"));

  if (storedToken) {
    // Utilisez le token comme vous le souhaitez
    console.log("Token présent :", storedToken);
    // Vous pouvez l'envoyer avec vos requêtes API, par exemple.
  } else {
    // Gérez le cas où le token n'est pas présent dans le localStorage.
    console.log("Aucun token n'est stocké dans le localStorage");
  }
  return (
    <>
      <Header />
      <Banner />
      <Feature />
      <Footer />
    </>
  );
}

export default Home;

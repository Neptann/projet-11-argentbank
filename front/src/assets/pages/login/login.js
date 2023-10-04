import "../login/login.css";
import Header from "../../components/header/header";
import Form from "../../components/form/form";
import Footer from "../../components/footer/footer";

function Login() {
  return (
    <div className="login">
      <header>
        <Header />
      </header>
      <main>
        <Form />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Login;

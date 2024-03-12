import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const styles = {
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    color: "#fff",
    padding: "30px 0",
  },
};

export default function Footer() {
  return (
    <>
    <footer style={styles.footer}>
      <div className="container-fluid d-flex align-items-center justify-content-around">
          {Auth.loggedIn() ? (
            <>
              <Link to={"/dashboard"} className="nav-link">
                <p className="text">Home</p>
              </Link>
            </>
          ) : (
            <Link to={"/"} className="nav-link">
              <p className="text">Home</p>
            </Link>
          )}
          <Link to={"/contact"} className="nav-link">
            <p className="text">Contact Us</p>
          </Link>
          <Link to={"/about"} className="nav-link">
            <p className="text">About Us</p>
          </Link>
          {Auth.loggedIn() ? (
            <>
            </>
          ) : (
            <Link to={"/signup"} className="nav-link">
              <p className="text">Sign Up</p>
            </Link>
          )}
        </div>
    </footer>
    </>
  );
}

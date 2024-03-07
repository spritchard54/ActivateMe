import { Link } from "react-router-dom";

// import Auth from '../utils/auth';

export default function Header() {
  // const logout = (event) => {
  //   event.preventDefault();
  //   Auth.logout();
  // };

  return (
    <>
      <header className="container-fluid header d-flex align-items-center">
        <nav className="navbar d-flex justify-content-between align-items-center">
          <Link to={"/dashboard"} className="navbar-brand ms-4">
            <h1 id="dev-name">ActivateMe.</h1>
          </Link>

          <div className="nav-box d-flex align-items-center gap-4 me-4">
            <Link to={"/"} className="nav-link">
              <p className="text">Home</p>
            </Link>
            <Link to={"/dashboard"} className="nav-link">
              <p className="text">Dashboard</p>
            </Link>
            <Link to={"/log-activity"} className="nav-link">
              <p className="text">Create</p>
            </Link>
            <Link to={"/contact"} className="nav-link">
              <p className="text">Contact Us</p>
            </Link>
            <Link to={"/login"} className="nav-link">
            <button className="logAct">Log In</button>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}

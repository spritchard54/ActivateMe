// import { useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Auth from "../utils/auth";

export default function Header() {
  // const logout = (event) => {
  //   event.preventDefault();
  //   Auth.logout();
  // };

  let navigate = useNavigate();
  const homeLogin = () => {
    let path = `/login`;
    navigate(path);
  };

  return (
    <>
      <header className="container-fluid header d-flex align-items-center">
        <nav className="navbar d-flex justify-content-between align-items-center">
          {Auth.loggedIn() ? (
            <>
              <Link to={"/dashboard"} className="navbar-brand ms-4">
                <h1 id="dev-name">ActivateMe.</h1>
              </Link>
            </>
          ) : (
            <Link to={"/"} className="navbar-brand ms-4">
              <h1 id="dev-name">ActivateMe.</h1>
            </Link>
          )}
          {Auth.loggedIn() ? (
            <>
              {/* <Link to={"/"} className="nav-link">
                <p className="text">Home</p>
              </Link> */}
              <Link to={"/dashboard"} className="nav-link">
                <p className="text">Dashboard</p>
              </Link>
              <Link to={"/activity-log"} className="nav-link">
                <p className="text">Activity Log</p>
              </Link>
              <Link to={"/log-activity"} className="nav-link">
                <p className="text">Create</p>
              </Link>
              <Link to={"/contact"} className="nav-link">
                <p className="text">Contact Us</p>
              </Link>
              <Link to={"/"} className="nav-link">
                <button onClick={Auth.logout} className="logAct">
                  Log Out
                </button>
              </Link>
            </>
          ) : (
            <button onClick={homeLogin} id="homeLogin" className="logAct">
              Log In
            </button>
          )}
        </nav>
      </header>
    </>
  );
}

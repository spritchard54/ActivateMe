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
              <Link to={"/dashboard"} className="navbar-brand ms-4 brand-title">
                <h1 id="dashlink">
                  <span className="green-title">
                    Activate
                  </span>
                  <span className="white-title">
                    Me
                  </span>
                  <span className="blue-title">
                    .
                  </span>
                </h1>
              </Link>
            </>
          ) : (
            <Link to={"/"} className="navbar-brand ms-4 brand-title">
              <h1 id="homelink">
                <span className="green-title">
                  Activate
                </span>
                <span className="white-title">
                  Me
                </span>
                <span className="blue-title">
                  .
                </span>
              </h1>
            </Link>
          )}
          {Auth.loggedIn() ? (
            <>
              <div className="d-flex align-items-center nav-link-box">
                <Link to={"/dashboard"} className="nav-link">
                  <p className="text m-3">Dashboard</p>
                </Link>
                <Link to={"/activity-log"} className="nav-link">
                  <p className="text m-3">Activity Log</p>
                </Link>
                <Link to={"/log-activity"} className="nav-link">
                  <p className="text m-3">Log an Activity</p>
                </Link>
                {/* <Link to={"/contact"} className="nav-link">
                  <p className="text">Contact Us</p>
                </Link> */}
                <Link to={"/"} className="nav-link">
                  <button onClick={Auth.logout} className="logout-btn">
                    Logout
                  </button>
                </Link>
              </div>
              
            </>
          ) : (
            // <div></div>
            <button onClick={homeLogin} id="homeLogin" className="logAct">
              Log In
            </button>
          )}
        </nav>
      </header>
    </>
  );
}

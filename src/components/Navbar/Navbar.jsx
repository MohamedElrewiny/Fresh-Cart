import React, { useContext, useState } from "react";
import Style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { UserContext } from "../../context/User/context";

export default function Navbar() {
  let { userToken, setUserToken } = useContext(UserContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <>
      <header className="bg-body-tertiary position-fixed fixed-top">
        <nav className="navbar navbar-expand-lg container  position-sticky top-0 z-1">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mb-2 mb-lg-0">
                {userToken !== null ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/products">
                        Products
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/categories">
                        Categories
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/brands">
                        Brands
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/cart">
                        Cart
                      </Link>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {userToken !== null ? (
                  <>
                    <li className="nav-item ">
                      <span
                        className="nav-link cursor-pointer fw-bold bg-danger-subtle btn"
                        onClick={() => logOut()}
                      >
                        Logout
                      </span>
                    </li>
                  </>
                ) : (
                  <div className="d-flex gap-2">
                    <li
                      className={`nav-item m-auto my-2 w-75 px-2 text-center ${Style.login}`}
                    >
                      <Link className="nav-link fw-bold " to="/login">
                        Login
                      </Link>
                    </li>
                    <li
                      className={`nav-item m-auto my-2 w-75 px-2 text-center ${Style.register}`}
                    >
                      <Link
                        className="nav-link fw-bold text-white"
                        to="/register"
                      >
                        Register
                      </Link>
                    </li>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

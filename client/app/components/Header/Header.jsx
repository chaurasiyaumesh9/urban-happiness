import React from "react";

import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <div className="container mb-2">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        {/* <a className="navbar-brand" href="#">
            <b>
              <i className="fab fa-adobe"></i> LOCALMART.IN
            </b>
          </a> */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                <i className="fas fa-home"></i>{" "}
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                {" "}
                USERS{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">
                {" "}
                CATEGORIES{" "}
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/counter">
                {" "}
                CAUNTER{" "}
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  </header>
);

export default Header;

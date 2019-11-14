import React from "react";

import { Link, NavLink } from "react-router-dom";

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
              <NavLink
                exact
                activeClassName="active"
                className="nav-link"
                to="/"
              >
                <i className="fas fa-home"></i>{" "}
                <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/users"
              >
                {" "}
                USERS{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/categories"
              >
                {" "}
                CATEGORIES{" "}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
);

export default Header;

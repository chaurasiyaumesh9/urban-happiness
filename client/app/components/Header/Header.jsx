import React from "react";

import { Link, NavLink } from "react-router-dom";
/*
const Header = () => (
  <header>
    <div className="container mb-2">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
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
*/

const Header = ({ toggleNavbar, logout }) => (
  <header>
    <div className="container">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navMenu"
            to="/"
            onClick={e => toggleNavbar(e)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </Link>
        </div>

        <div id="navMenu" className="navbar-menu">
          <div className="navbar-start">
            <NavLink
              exact
              activeClassName="active"
              className="navbar-item"
              to="/"
            >
              <span className="uh-icon phone-icon">
                <svg className="uh-icon-home">
                  <use xlinkHref="assets/img/sprite.svg#icon-home"></use>
                </svg>
              </span>
            </NavLink>
            {/* <NavLink
              exact
              activeClassName="active"
              className="navbar-item"
              to="/account/signin"
            >
              LOGIN
            </NavLink> */}
            <NavLink
              exact
              activeClassName="active"
              className="navbar-item"
              to="/account/logout"
              onClick={e => logout(e)}
            >
              LOGOUT
            </NavLink>
            <NavLink
              exact
              activeClassName="active"
              className="navbar-item"
              to="/users"
            >
              USERS
            </NavLink>
            <NavLink
              exact
              activeClassName="active"
              className="navbar-item"
              to="/categories"
            >
              CATEGORIES
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  </header>
);
export default Header;

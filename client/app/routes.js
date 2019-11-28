import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./components/App/NotFound";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import UsersList from "./components/Users/UsersList";
import UserForm from "./components/Users/UserForm";
import Login from "./components/Login/Login";
const Routes = ({ setNotification, setLoaderStatus }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      exact
      path="/account/signin"
      render={props => (
        <Login
          {...props}
          setNotification={setNotification}
          setLoaderStatus={setLoaderStatus}
        />
      )}
    />
    <Route
      exact
      path="/users"
      render={props => (
        <UsersList
          {...props}
          setNotification={setNotification}
          setLoaderStatus={setLoaderStatus}
        />
      )}
    />
    <Route
      exact
      path="/users/create"
      render={props => (
        <UserForm
          {...props}
          setNotification={setNotification}
          setLoaderStatus={setLoaderStatus}
        />
      )}
    />
    <Route
      exact
      path="/users/:id"
      render={props => (
        <UserForm
          {...props}
          setNotification={setNotification}
          setLoaderStatus={setLoaderStatus}
        />
      )}
    />
    <Route exact path="/categories" component={Categories} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;

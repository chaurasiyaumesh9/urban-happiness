import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./components/App/NotFound";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import UsersList from "./components/Users/UsersList";
import CreateUser from "./components/Users/CreateUser";
import EditUser from "./components/Users/EditUser";
const Routes = ({ setNotification, setLoaderStatus }) => (
  <Switch>
    <Route exact path="/" component={Home} />
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
        <CreateUser
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
        <EditUser
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

import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./components/App/NotFound";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import UsersList from "./components/Users/UsersList";
import CreateUser from "./components/Users/CreateUser";
import EditUser from "./components/Users/EditUser";
const Routes = ({ setNotification }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/users" component={UsersList} />
    <Route exact path="/users/create" component={CreateUser} />
    <Route
      exact
      path="/users/:id"
      component={props => (
        <EditUser {...props} setNotification={setNotification} />
      )}
    />
    {/* <Route exact path="/users/:id" component={EditUser} /> */}
    <Route exact path="/categories" component={Categories} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;

import React, { Component, Fragment } from "react";
import { withRouter, Route, Switch } from "react-router-dom";

import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routes from "../../routes";

const Container = () => {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route component={Routes} />
      </Switch>
      <Footer />
    </Fragment>
  );
};
export default withRouter(Container);

import React, { Component, Fragment } from "react";
import { withRouter, Route, Switch } from "react-router-dom";

import Notifications from "../Notifications/Notifications";
import Loader from "../Loader/Loader";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routes from "../../routes";

class Container extends Component {
  state = {
    notification: {
      type: null,
      message: null,
      show: false
    },
    loader: {
      show: false
    }
  };
  closeNotification = () => {
    this.setState({
      notification: {
        type: null,
        message: null,
        show: false
      }
    });
  };
  modifyNotification = notificationObj => {
    this.setState({
      notification: {
        type: notificationObj.type,
        message: notificationObj.message,
        show: notificationObj.show
      }
    });
  };
  toggleLoader = flag => {
    this.setState({
      loader: {
        show: flag
      }
    });
  };

  render() {
    return (
      <Fragment>
        <Header />
        {this.state.notification.show && (
          <Notifications
            notification={this.state.notification}
            closeHandler={() => this.closeNotification()}
          />
        )}
        {this.state.loader.show && <Loader loader={this.state.loader} />}
        <Switch>
          <Route
            render={props => (
              <Routes
                setNotification={this.modifyNotification}
                setLoaderStatus={this.toggleLoader}
              />
            )}
          />
        </Switch>
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(Container);

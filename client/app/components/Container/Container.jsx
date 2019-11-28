import React, { Component, Fragment } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { setInStorage, getFromStorage } from "../../utils/storage";

import Notifications from "../Notifications/Notifications";
import Loader from "../Loader/Loader";
import Login from "../Login/Login";
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
    },
    signin: {
      success: false,
      message: "",
      token: ""
    }
  };
  setSignInOptions = options => {
    this.setState({
      signin: {
        success: options.success,
        message: options.message,
        token: options.token
      }
    });
  };
  componentDidMount() {
    const obj = getFromStorage("the_urban_happiness");
    if (obj && obj.token) {
      const { token } = obj;
      fetch("/api/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              signin: {
                message: json.message,
                success: true
              }
            });
          } else {
            this.toggleLoader(false);
          }
        });
    } else {
      this.toggleLoader(false);
    }
  }
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
  toggleNavbar = e => {
    e.preventDefault();
    const sourceElement = e.target;
    const target = sourceElement.dataset.target;
    const $target = document.getElementById(target);
    //debugger;
    if (sourceElement) sourceElement.classList.toggle("is-active");
    if ($target) $target.classList.toggle("is-active");
  };
  logout = e => {
    e.preventDefault();
    const obj = getFromStorage("the_urban_happiness");
    this.toggleLoader(true);
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch("/api/account/logout?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              signin: {
                token: "",
                message: "",
                success: false
              }
            });
            setInStorage("the_urban_happiness", { token: "" });
          }
        })
        .finally(() => {
          this.toggleLoader(false);
        });
    }
  };

  render() {
    return (
      <Fragment>
        {this.state.signin.success && (
          <Header
            logout={e => this.logout(e)}
            toggleNavbar={e => this.toggleNavbar(e)}
          />
        )}

        {this.state.notification.show && (
          <Notifications
            notification={this.state.notification}
            closeHandler={() => this.closeNotification()}
          />
        )}
        {!this.state.signin.success && (
          <Login
            setNotification={this.modifyNotification}
            setLoaderStatus={this.toggleLoader}
            setSignInOptions={this.setSignInOptions}
          />
        )}
        {this.state.loader.show && <Loader loader={this.state.loader} />}

        <Switch>
          {this.state.signin.success && (
            <Route
              render={props => (
                <Routes
                  setNotification={this.modifyNotification}
                  setLoaderStatus={this.toggleLoader}
                />
              )}
            />
          )}
        </Switch>
        {this.state.signin.success && <Footer />}
      </Fragment>
    );
  }
}

export default withRouter(Container);

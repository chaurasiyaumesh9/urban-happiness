import React from "react";
import { setInStorage, getFromStorage } from "../../utils/storage";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        signInEmail: "",
        signInPassword: "",
        token: ""
      },
      errors: {
        signInEmail: "",
        signInPassword: "",
        signInError: ""
      }
    };
  }

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        [name]: value
      },
      errors: {
        ...prevState.errors
      }
    }));
  };
  onSignIn = () => {
    const { signInEmail, signInPassword } = this.state.fields;
    this.props.setLoaderStatus(true);

    // Post request to backend
    fetch("/api/account/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setInStorage("the_urban_happiness", { token: json.token });
          this.props.setLoaderStatus(false);
          this.setState({
            errors: {
              signInError: json.message
            },
            fields: {
              signInPassword: "",
              signInEmail: "",
              token: json.token
            }
          });
          this.props.setSignInOptions({
            token: json.token,
            success: true,
            message: "Good"
          });
        } else {
          this.setState({
            errors: {
              signInError: json.message
            }
          });
          this.props.setNotification({
            type: "warning",
            message: json.message,
            show: true
          });
          this.props.setLoaderStatus(false);
        }
      });
  };
  render() {
    return (
      <div className="container login">
        <h4 className="text-center">
          {" "}
          {/* <span className="uh-icon icon-enter">
            <svg className="uh-icon-enter">
              <use xlinkHref="assets/img/sprite.svg#icon-enter"></use>
            </svg>
          </span> */}
          <span className="title is-4">LOGIN USING YOUR CREDENTIAL</span>
        </h4>
        <div className="box">
          <div className="field">
            <label className="label">
              {/* <span className="uh-icon icon-user">
                  <svg className="uh-icon-user">
                    <use xlinkHref="assets/img/sprite.svg#icon-user"></use>
                  </svg>
                </span> */}
              <span className="title is-6">USERNAME</span>
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="signInEmail"
                id="signInEmail"
                value={this.state.fields.signInEmail || ""}
                onChange={event => this.handleUserInput(event)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label"> PASSWORD </label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="signInPassword"
                id="signInPassword"
                value={this.state.fields.signInPassword || ""}
                onChange={event => this.handleUserInput(event)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control text-center">
              <button className="button is-link login" onClick={this.onSignIn}>
                {" "}
                <span className="uh-icon icon-enter">
                  <svg className="uh-icon-enter">
                    <use xlinkHref="assets/img/sprite.svg#icon-enter"></use>
                  </svg>
                </span>
                <span className="title is-6">LOGIN</span>{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-third"></div>
        </div>
      </div>
    );
  }
}
export default Login;

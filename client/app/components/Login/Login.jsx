import React from "react";
class Login extends React.Component {
  render() {
    return (
      <div className="container">
        <h4 className="title is-4 text-center mt-4 mb-4">
          {" "}
          AUTHENTICATE USING YOUR CREDENTIAL{" "}
        </h4>
        <div className="field">
          <label className="label"> USERNAME </label>
          <div className="control">
            <input className="input" type="text" />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label"> PASSWORD </label>
          <div className="control">
            <input className="input" type="password" />
          </div>
        </div>
      </div>
    );
  }
}
export default Login;

import React, { Component } from "react";
import axios from "axios";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.onGenderChanged = this.onGenderChanged.bind(this);
    this.onFirstNameChanged = this.onFirstNameChanged.bind(this);
    this.onLastNameChanged = this.onLastNameChanged.bind(this);
    this.onContactChanged = this.onContactChanged.bind(this);
    this.onAadharChanged = this.onAadharChanged.bind(this);
    this.onAddressChanged = this.onAddressChanged.bind(this);
    this.onUsernameChanged = this.onUsernameChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setUserProperties = this.setUserProperties.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      gender: "",
      username: "",
      password: "",
      contact: "",
      aadhar: "",
      address: ""
    };
  }
  setUserProperties(userobj) {
    this.setState({
      firstName: userobj.firstName,
      lastName: userobj.lastName,
      gender: userobj.gender,
      username: userobj.username,
      password: userobj.password,
      contact: userobj.contact,
      aadhar: userobj.aadhar,
      address: userobj.address
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let self = this;
    const obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gender: this.state.gender,
      username: this.state.username,
      password: this.state.password,
      contact: this.state.contact,
      aadhar: this.state.aadhar,
      address: this.state.aadhar
    };

    fetch("/api/users/", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        user: obj
      })
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setUserProperties({
          firstName: "",
          lastName: "",
          gender: "",
          username: "",
          password: "",
          contact: "",
          aadhar: "",
          address: ""
        });
      })
      .catch(e => console.log(e));

    //this.props.history.push("/users");
  }
  onAddressChanged(e) {
    this.setState({
      address: e.target.value
    });
  }
  onAadharChanged(e) {
    this.setState({
      aadhar: e.target.value
    });
  }
  onGenderChanged(e) {
    this.setState({
      gender: e.target.value
    });
  }
  onFirstNameChanged(e) {
    this.setState({
      firstName: e.target.value
    });
  }
  onLastNameChanged(e) {
    this.setState({
      lastName: e.target.value
    });
  }
  onContactChanged(e) {
    this.setState({
      contact: e.target.value
    });
  }
  onUsernameChanged(e) {
    this.setState({
      username: e.target.value
    });
  }
  onPasswordChanged(e) {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    return (
      <div className="container mt-5">
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="txt-firstname"> First Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="txt-firstname"
                  id="txt-firstname"
                  value={this.state.firstName}
                  onChange={this.onFirstNameChanged}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="txt-lastname"> Last Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="txt-lastname"
                  id="txt-lastname"
                  value={this.state.lastName}
                  onChange={this.onLastNameChanged}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="txt-contact">Contact</label>
                <input
                  className="form-control"
                  type="text"
                  name="txt-contact"
                  id="txt-contact"
                  value={this.state.contact}
                  maxLength="11"
                  onChange={this.onContactChanged}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="txt-aadhar">Aadhar</label>
                <input
                  className="form-control"
                  type="text"
                  name="txt-aadhar"
                  id="txt-aadhar"
                  value={this.state.aadhar}
                  onChange={this.onAadharChanged}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="txt-username">Username</label>
                <input
                  className="form-control"
                  type="text"
                  name="txt-username"
                  id="txt-username"
                  value={this.state.username}
                  onChange={this.onUsernameChanged}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="txt-password">Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="txt-password"
                  id="txt-password"
                  value={this.state.password}
                  onChange={this.onPasswordChanged}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="txt-address">Address</label>
                <textarea
                  className="form-control"
                  name="txt-address"
                  id="txt-address"
                  value={this.state.address}
                  cols="16"
                  rows="5"
                  onChange={this.onAddressChanged}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="rdo-male"
                    value="Male"
                    checked={this.state.gender === "Male"}
                    onChange={this.onGenderChanged}
                  />
                  <label className="form-check-label" htmlFor="rdo-male">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="rdo-female"
                    value="Female"
                    checked={this.state.gender === "Female"}
                    onChange={this.onGenderChanged}
                  />
                  <label className="form-check-label" htmlFor="rdo-female">
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-primary mr-1" type="submit">
            SUBMIT
          </button>
          <button
            className="btn btn-primary"
            onClick={() => this.props.history.push("/users")}
          >
            <i className="fas fa-chevron-left"></i>GO BACK
          </button>
        </form>
      </div>
    );
  }
}
export default CreateUser;

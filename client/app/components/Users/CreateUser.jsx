import React, { Component } from "react";
import axios from "axios";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      addressProof: {
        type: "",
        document: {
          url: "",
          secure_url: ""
        }
      },
      idProof: {
        type: "",
        document: {
          url: "",
          secure_url: ""
        }
      },
      password: "",
      confirmPassword: "",
      contact: "",
      photo: {
        url: "",
        secure_url: ""
      },
      type: "",
      gender: ""
    };
  }
  setUserProperties = userobj => {
    this.setState({
      name: userobj.name,
      email: userobj.email,
      addressProof: userobj.addressProof,
      idProof: userobj.idProof,
      password: userobj.password,
      confirmPassword: userobj.confirmPassword,
      contact: userobj.contact,
      photo: userobj.photo,
      type: userobj.type,
      gender: userobj.gender
    });
  };
  uploadAddressProof = () => {
    const formData = new FormData();
    let file = this.state.addressProofDocument.file;
    formData.append(0, file);
    fetch("/api/image-upload", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(image => {
        console.log("address proof : ", image);
        // this.setState({
        //   addressProofDocument: image[0]
        // });
      });
  };
  onSubmit = e => {
    e.preventDefault();

    this.uploadAddressProof();
    return;
    // const obj = {
    //   name: this.state.name,
    //   email: this.state.email,
    //   addressProof: this.state.addressProof,
    //   idProof: this.state.idProof,
    //   password: this.state.password,
    //  confirmPassword:this.state.confirmPassword,
    //   contact: this.state.contact,
    //   photo: this.state.photo,
    //   type: this.state.type,
    //   gender: this.state.gender
    // };

    // fetch("/api/users/", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8"
    //   },
    //   body: JSON.stringify({
    //     user: obj
    //   })
    // })
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(json => {
    //     this.setUserProperties({
    //       name: "",
    //       email: "",
    //        addressType: "",
    //       addressProof: "",
    //       idProof: "",
    //       password: "",
    //       contact: "",
    //       photo: "",
    //       type: "",
    //       gender: ""
    //     });
    //     this.props.setNotification({
    //       type: "success",
    //       message: "Record Saved Successfully!!",
    //       show: true
    //     });
    //   })
    //   .catch(e => console.log(e));
  };
  onNameChanged = e => {
    this.setState({
      name: e.target.value
    });
  };
  onEmailChanged = e => {
    this.setState({
      email: e.target.value
    });
  };
  onContactChanged = e => {
    this.setState({
      contact: e.target.value
    });
  };
  onPasswordChanged = e => {
    this.setState({
      password: e.target.value
    });
  };

  onConfirmPasswordChanged = e => {
    this.setState({
      confirmPassword: e.target.value
    });
  };

  onGenderChanged = e => {
    this.setState({
      gender: e.target.value
    });
  };
  onUserRoleChanged = e => {
    this.setState({
      type: e.target.value
    });
  };
  handleAddressProofImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState(prevState => ({
        addressProof: {
          ...prevState.addressProof,
          document: {
            file: file,
            url: reader.result
          }
        }
      }));
    };
    if (file) reader.readAsDataURL(file);
  };
  onAddressTypeChanged = e => {
    let updatedType = e.target.value;
    this.setState(prevState => ({
      addressProof: {
        type: updatedType
      }
    }));
  };
  render() {
    let $addressProofDocumentPreview = null;
    if (
      this.state.addressProof.document &&
      (this.state.addressProof.document.url ||
        this.state.addressProof.document.secure_url)
    ) {
      $addressProofDocumentPreview = (
        <img
          src={
            this.state.addressProof.document.secure_url ||
            this.state.addressProof.document.url
          }
        />
      );
    } else {
      $addressProofDocumentPreview = (
        <div className="previewText mt-5">
          <i>Please choose address proof to see preview</i>
        </div>
      );
    }
    let htmlAddressProof = null;
    if (this.state.addressProof.type != "") {
      htmlAddressProof = (
        <div className="col-sm-8">
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <label className="col-form-label" htmlFor="file-addressproof">
                  {" "}
                  Photo of {this.state.addressProof.type}
                </label>
                <div className="input-group mb-3">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="file-addressproof"
                      onChange={e => this.handleAddressProofImageChange(e)}
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="file-addressproof"
                    >
                      Choose file
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="imgPreview">{$addressProofDocumentPreview}</div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container mt-0">
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <label className="col-form-label" htmlFor="txt-name">
                  {" "}
                  Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="txt-name"
                  id="txt-name"
                  value={this.state.name}
                  onChange={this.onNameChanged}
                />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <label className="col-form-label" htmlFor="txt-lastname">
                  {" "}
                  Email{" "}
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="txt-email"
                  id="txt-email"
                  value={this.state.email}
                  onChange={this.onEmailChanged}
                />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <label className="col-form-label" htmlFor="txt-contact">
                  Contact
                </label>
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
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <label className="col-form-label" htmlFor="txt-usertype">
                  {" "}
                  User Role/Type{" "}
                </label>
                <select
                  className="form-control"
                  name="txt-usertype"
                  id="text-usertype"
                  onChange={this.onUserRoleChanged}
                >
                  <option value="admin">ADMIN</option>
                  <option value="on-field-user">ON-FIELD-USER</option>
                  <option value="vendor">VENDOR</option>
                  <option value="customer">CUSTOMER</option>
                </select>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <label className="col-form-label" htmlFor="txt-password">
                  Password
                </label>
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
            <div className="col-sm-4">
              <div className="form-group">
                <label
                  className="col-form-label"
                  htmlFor="txt-confirm-password"
                >
                  Confirm Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="txt-confirm-password"
                  id="txt-confirm-password"
                  value={this.state.confirmPassword}
                  onChange={this.onConfirmPasswordChanged}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <label htmlFor="addressType" className="col-form-label">
                  {" "}
                  Proof of Residence{" "}
                </label>
                <select
                  className="form-control"
                  name="txt-addressType"
                  id="text-addressType"
                  onChange={this.onAddressTypeChanged}
                >
                  <option value="aadhar-card">AADHAR CARD</option>
                  <option value="driving-license">DRIVING LICENSE</option>
                  <option value="passport">PASSPORT</option>
                  <option value="bank-passbook">BANK PASSBOOK</option>
                  <option value="electricity-bill">ELECTRICITY BILL</option>
                  <option value="gas-bill">GAS BILL</option>
                  <option value="water-bill">WATER BILL</option>
                  <option value="ration-card">RATION CARD</option>
                </select>
              </div>
            </div>
            {htmlAddressProof}
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <legend className="col-form-label mt-3"> Gender </legend>
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
          <button className="btn btn-sm btn-primary mr-1" type="submit">
            SUBMIT
          </button>
          <button
            className="btn btn-sm btn-info"
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

import React, { Component } from "react";
import axios from "axios";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountHolderName: "",
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
      userType: "",
      gender: ""
    };
  }
  setUserProperties = userobj => {
    this.setState({
      accountHolderName: userobj.name,
      email: userobj.email,
      addressProof: userobj.addressProof,
      idProof: userobj.idProof,
      password: userobj.password,
      confirmPassword: userobj.confirmPassword,
      contact: userobj.contact,
      photo: userobj.photo,
      userType: userobj.type,
      gender: userobj.gender
    });
  };
  resetState = () => {
    this.setUserProperties({
      accountHolderName: "",
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
      userType: "",
      gender: ""
    });
  };
  uploadImages = () => {
    const formData = new FormData();
    let addressProofFile = this.state.addressProof.document.file;
    let idProofFile = this.state.idProof.document.file;
    let photoFile = this.state.photo.file;
    formData.append(0, addressProofFile);
    formData.append(1, idProofFile);
    formData.append(2, photoFile);
    return fetch("/api/image-upload", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(images => {
        console.log("Images : ", images);

        this.setState(prevState => ({
          addressProof: {
            ...prevState.addressProof,
            document: {
              url: images[0]["url"],
              secure_url: images[0]["secure_url"]
            }
          },
          idProof: {
            ...prevState.idProof,
            document: {
              url: images[1]["url"],
              secure_url: images[1]["secure_url"]
            }
          },
          photo: {
            url: images[2]["url"],
            secure_url: images[2]["secure_url"]
          }
        }));
      });
  };
  onSubmit = e => {
    e.preventDefault();

    this.uploadImages()
      .then(() => {
        const obj = {
          accountHolderName: this.state.accountHolderName,
          email: this.state.email,
          addressProof: this.state.addressProof,
          idProof: this.state.idProof,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          contact: this.state.contact,
          photo: this.state.photo,
          userType: this.state.userType,
          gender: this.state.gender
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
            this.resetState();
            this.props.setNotification({
              type: "success",
              message: "User Saved Successfully!!",
              show: true
            });
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
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
  handleIdProofImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState(prevState => ({
        idProof: {
          ...prevState.idProof,
          document: {
            file: file,
            url: reader.result
          }
        }
      }));
    };
    if (file) reader.readAsDataURL(file);
  };
  handlePhotoChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState(prevState => ({
        photo: {
          file: file,
          url: reader.result
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
  onIdTypeChanged = e => {
    let updatedType = e.target.value;
    this.setState(prevState => ({
      idProof: {
        type: updatedType
      }
    }));
  };
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  render() {
    let $addressProofDocumentPreview = null,
      $idProofDocumentPreview = null,
      $photoPreview = null;
    if (
      this.state.photo &&
      (this.state.photo.url || this.state.photo.secure_url)
    ) {
      $photoPreview = (
        <img src={this.state.photo.secure_url || this.state.photo.url} />
      );
    } else {
      $photoPreview = (
        <div className="previewText mt-5">
          <i>Please choose photo to see preview</i>
        </div>
      );
    }
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
    if (
      this.state.idProof.document &&
      (this.state.idProof.document.url ||
        this.state.idProof.document.secure_url)
    ) {
      $idProofDocumentPreview = (
        <img
          src={
            this.state.idProof.document.secure_url ||
            this.state.idProof.document.url
          }
        />
      );
    } else {
      $idProofDocumentPreview = (
        <div className="previewText mt-5">
          <i>Please choose id proof to see preview</i>
        </div>
      );
    }

    let htmlAddressProof = null,
      htmlIdProof = null;
    if (this.state.addressProof.type != "") {
      htmlAddressProof = (
        <div className="col-sm-8">
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <label className="col-form-label" htmlFor="file-addressproof">
                  {" "}
                  Photo copy of {this.state.addressProof.type}
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
    if (this.state.idProof.type != "") {
      htmlIdProof = (
        <div className="col-sm-8">
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <label className="col-form-label" htmlFor="file-idproof">
                  {" "}
                  Photo copy of {this.state.idProof.type}
                </label>
                <div className="input-group mb-3">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="file-idproof"
                      onChange={e => this.handleIdProofImageChange(e)}
                    />
                    <label className="custom-file-label" htmlFor="file-idproof">
                      Choose file
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="imgPreview">{$idProofDocumentPreview}</div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container mt-0">
        <h4 className="title text-center mt-4 mb-4">
          {" "}
          CREATE NEW USER ACCOUNT{" "}
        </h4>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <label className="col-form-label" htmlFor="accountHolderName">
                  {" "}
                  Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="accountHolderName"
                  id="accountHolderName"
                  value={this.state.accountHolderName || ""}
                  onChange={event => this.handleUserInput(event)}
                />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <label className="col-form-label" htmlFor="email">
                  {" "}
                  Email{" "}
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  id="email"
                  value={this.state.email || ""}
                  onChange={event => this.handleUserInput(event)}
                />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <label className="col-form-label" htmlFor="contact">
                  Contact
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="contact"
                  id="contact"
                  value={this.state.contact || ""}
                  maxLength="11"
                  onChange={event => this.handleUserInput(event)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <label className="col-form-label" htmlFor="userType">
                  {" "}
                  User Role/Type{" "}
                </label>
                <select
                  className="form-control"
                  name="userType"
                  id="userType"
                  value={this.state.userType || ""}
                  onChange={event => this.handleUserInput(event)}
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
                <label className="col-form-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.password || ""}
                  onChange={event => this.handleUserInput(event)}
                />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <label className="col-form-label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={this.state.confirmPassword || ""}
                  onChange={event => this.handleUserInput(event)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <label
                  htmlFor="dropdown-addressType"
                  className="col-form-label"
                >
                  {" "}
                  Proof of Residence{" "}
                </label>
                <select
                  className="form-control"
                  name="dropdown-addressType"
                  id="dropdown-addressType"
                  value={this.state.addressProof.type || ""}
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
                <label htmlFor="dropdown-idType" className="col-form-label">
                  {" "}
                  Proof of ID{" "}
                </label>
                <select
                  className="form-control"
                  name="dropdown-idType"
                  id="dropdown-idType"
                  value={this.state.idProof.type || ""}
                  onChange={this.onIdTypeChanged}
                >
                  <option value="aadhar-card">AADHAR CARD</option>
                  <option value="pan-card">PAN CARD</option>
                  <option value="voter-id">VOTER ID</option>
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
            {htmlIdProof}
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <label className="col-form-label" htmlFor="file-user-photo">
                  {" "}
                  Upload Photo
                </label>
                <div className="input-group mb-3">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="file-user-photo"
                      onChange={e => this.handlePhotoChange(e)}
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="file-user-photo"
                    >
                      Choose file
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="imgPreview">{$photoPreview}</div>
            </div>
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
                    onChange={event => this.handleUserInput(event)}
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
                    onChange={event => this.handleUserInput(event)}
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

import React, { Component } from "react";

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
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
      },
      errors: {
        accountHolderName: "",
        email: "",
        contact: "",
        addressProof: {
          type: "",
          document: ""
        },
        gender: "",
        userType: "",
        photo: "",
        password: "",
        confirmPassword: "",
        idProof: {
          type: "",
          document: ""
        }
      },
      formValid: false,
      editMode: this.props.match.params.id ? true : false
    };
  }
  componentDidMount() {
    if (this.props.match.params.id) {
      fetch("/api/users/" + this.props.match.params.id)
        .then(res => res.json())
        .then(json => {
          this.setState({
            fields: {
              accountHolderName: json.accountHolderName,
              email: json.email,
              addressProof: json.addressProof,
              idProof: json.idProof,
              password: json.password,
              confirmPassword: json.confirmPassword,
              contact: json.contact,
              photo: json.photo,
              userType: json.userType,
              gender: json.gender
            }
          });
        });
    }
  }
  resetState = () => {
    this.setState({
      fields: {
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
      },
      errors: {
        accountHolderName: "",
        email: "",
        contact: "",
        addressProof: {
          type: "",
          document: ""
        },
        gender: "",
        userType: "",
        photo: "",
        password: "",
        confirmPassword: "",
        idProof: {
          type: "",
          document: ""
        }
      },
      formValid: false,
      editMode: this.props.match.params.id ? true : false
    });
  };
  onSubmit = e => {
    e.preventDefault();

    let formIsValid = this.validateFields();
    if (formIsValid || this.state.formValid) {
      this.props.setLoaderStatus(true);
      const formData = new FormData();
      for (let fieldName in this.state.fields) {
        switch (fieldName) {
          case "addressProof":
            if (
              !this.state.editMode ||
              this.state.fields.addressProof.document.hasOwnProperty("file")
            ) {
              formData.append(
                fieldName,
                this.state.fields.addressProof.document.file
              );
            } else {
              formData.append(
                fieldName,
                JSON.stringify(this.state.fields.addressProof.document)
              );
            }

            formData.append(
              "addressProofType",
              this.state.fields.addressProof.type
            );
            break;
          case "idProof":
            if (
              !this.state.editMode ||
              this.state.fields.idProof.document.hasOwnProperty("file")
            ) {
              formData.append(
                fieldName,
                this.state.fields.idProof.document.file
              );
            } else {
              formData.append(
                fieldName,
                JSON.stringify(this.state.fields.idProof.document)
              );
            }
            formData.append("idProofType", this.state.fields.idProof.type);
            break;
          case "photo":
            if (
              !this.state.editMode ||
              this.state.fields.photo.hasOwnProperty("file")
            ) {
              formData.append(fieldName, this.state.fields.photo.file);
            } else {
              formData.append(
                fieldName,
                JSON.stringify(this.state.fields.photo)
              );
            }
            break;
          default:
            formData.append(fieldName, this.state.fields[fieldName]);
            break;
        }
      }
      if (this.state.editMode) {
        this.updateExistingUser(formData);
      } else {
        this.createNewUser(formData);
      }
    }
  };
  updateExistingUser = formData => {
    fetch("/api/users/" + this.props.match.params.id, {
      method: "PUT",
      body: formData
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.props.setNotification({
          type: "success",
          message: "User updated successfully!!",
          show: true
        });
        this.props.setLoaderStatus(false);
      })
      .catch(e => console.log(e));
  };
  createNewUser = formData => {
    fetch("/api/users", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(json => {
        this.resetState();
        this.props.setNotification({
          type: "success",
          message: "User Created Successfully!!",
          show: true
        });
        this.props.setLoaderStatus(false);
      })
      .catch(e => console.log(e));
  };

  handleAddressProofImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState(prevState => ({
        fields: {
          ...prevState.fields,
          addressProof: {
            ...prevState.fields.addressProof,
            document: {
              file: file,
              url: reader.result
            }
          }
        },
        errors: {
          ...prevState.errors
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
        fields: {
          ...prevState.fields,
          idProof: {
            ...prevState.fields.idProof,
            document: {
              file: file,
              url: reader.result
            }
          }
        },
        errors: {
          ...prevState.errors
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
        fields: {
          ...prevState.fields,
          photo: {
            file: file,
            url: reader.result
          }
        },
        errors: {
          ...prevState.errors
        }
      }));
    };
    if (file) reader.readAsDataURL(file);
  };
  onAddressTypeChanged = e => {
    let updatedType = e.target.value;
    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        addressProof: {
          document: {
            ...prevState.fields.addressProof.document
          },
          type: updatedType
        }
      },
      errors: {
        ...prevState.errors
      }
    }));
  };
  onIdTypeChanged = e => {
    let updatedType = e.target.value;
    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        idProof: {
          document: {
            ...prevState.fields.idProof.document
          },
          type: updatedType
        }
      },
      errors: {
        ...prevState.errors
      }
    }));
  };
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
  validateFields = () => {
    let fieldValidationErrors = this.state.errors;
    let formIsValid = true;
    for (let fieldName in this.state.fields) {
      let value = this.state.fields[fieldName];
      switch (fieldName) {
        case "accountHolderName":
          fieldValidationErrors.accountHolderName = "";
          if (value.toString().trim().length < 4) {
            fieldValidationErrors.accountHolderName = "Name is too short";
            formIsValid = false;
          }
          break;
        case "gender":
          fieldValidationErrors.gender = "";
          if (value.toString().trim() == "") {
            fieldValidationErrors.gender = "Please select gender";
            formIsValid = false;
          }
          break;
        case "email":
          fieldValidationErrors.email = "";
          if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            fieldValidationErrors.email = "Email is invalid";
            formIsValid = false;
          }
          break;
        case "contact":
          fieldValidationErrors.contact = "";
          if (value.toString().trim().length < 10) {
            fieldValidationErrors.contact =
              "Contact number should be of 10 digits";
            formIsValid = false;
          }
          if (!value.toString().match(/^[0-9]*$/i)) {
            fieldValidationErrors.contact = "Only numbers are allowed";
            formIsValid = false;
          }
          break;
        case "userType":
          fieldValidationErrors.userType = "";
          if (value.toString().trim() == "") {
            fieldValidationErrors.userType = "Please choose user's role";
            formIsValid = false;
          }
          break;
        case "password":
          fieldValidationErrors.password = "";
          if (value.toString().trim().length < 6) {
            fieldValidationErrors.password =
              "Password should be minimum of 6 characters";
            formIsValid = false;
          }
          break;
        case "confirmPassword":
          fieldValidationErrors.confirmPassword = "";
          if (!this.state.editMode) {
            if (value.toString().trim() != this.state.fields.password.trim()) {
              fieldValidationErrors.confirmPassword =
                "Not matching with password";
              formIsValid = false;
            }
          }

          break;
        case "addressProof":
          fieldValidationErrors.addressProof.type = "";
          fieldValidationErrors.addressProof.document = "";
          if (value.type.toString().trim() == "") {
            fieldValidationErrors.addressProof.type =
              "Please choose document type";
            formIsValid = false;
          }
          if (
            value.document.url == "" &&
            !value.document.file &&
            value.document.secure_url == "" &&
            value.type.toString().trim() != ""
          ) {
            fieldValidationErrors.addressProof.document = "Please upload image";
            formIsValid = false;
          }
          break;
        case "idProof":
          fieldValidationErrors.idProof.type = "";
          fieldValidationErrors.idProof.document = "";
          if (value.type.toString().trim() == "") {
            fieldValidationErrors.idProof.type = "Please choose document type";
            formIsValid = false;
          }
          if (
            value.document.url == "" &&
            !value.document.file &&
            value.document.secure_url == "" &&
            value.type.toString().trim() != ""
          ) {
            fieldValidationErrors.idProof.document = "Please upload image";
            formIsValid = false;
          }
          break;
        case "photo":
          fieldValidationErrors.photo = "";
          if (value.url == "" && !value.file && value.secure_url == "") {
            fieldValidationErrors.photo = "Please upload your photo";
            formIsValid = false;
          }
          break;
        default:
          break;
      }
    }

    this.setState(prevState => ({
      fields: {
        ...prevState.fields
      },
      errors: fieldValidationErrors,
      formValid: formIsValid
    }));
    return formIsValid;
  };

  errorClass(error) {
    return error.length === 0 ? "" : "is-invalid";
  }
  render() {
    let $addressProofDocumentPreview = null,
      $idProofDocumentPreview = null,
      $photoPreview = null;
    if (
      this.state.fields.photo &&
      (this.state.fields.photo.url || this.state.fields.photo.secure_url)
    ) {
      $photoPreview = (
        <img
          src={
            this.state.fields.photo.secure_url || this.state.fields.photo.url
          }
        />
      );
    } else {
      $photoPreview = (
        <div className="previewText mt-5">
          <i>Please choose photo to see preview</i>
        </div>
      );
    }
    if (
      this.state.fields.addressProof.document &&
      (this.state.fields.addressProof.document.url ||
        this.state.fields.addressProof.document.secure_url)
    ) {
      $addressProofDocumentPreview = (
        <img
          src={
            this.state.fields.addressProof.document.secure_url ||
            this.state.fields.addressProof.document.url
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
      this.state.fields.idProof.document &&
      (this.state.fields.idProof.document.url ||
        this.state.fields.idProof.document.secure_url)
    ) {
      $idProofDocumentPreview = (
        <img
          src={
            this.state.fields.idProof.document.secure_url ||
            this.state.fields.idProof.document.url
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
    if (this.state.fields.addressProof.type != "") {
      htmlAddressProof = (
        <div className="column is-two-thirds">
          <div className="columns">
            <div className="column is-one-third">
              <div className="field">
                <label className="col-form-label" htmlFor="file-addressproof">
                  {" "}
                  Photo copy of {this.state.fields.addressProof.type}
                </label>
                <div className="input-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      className={`custom-file-input ${this.errorClass(
                        this.state.errors.addressProof.document
                      )}`}
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
                <span className="error">
                  {this.state.errors.addressProof.document}
                </span>
              </div>
            </div>
            <div className="column is-two-thirds">
              <div className="imgPreview">{$addressProofDocumentPreview}</div>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.fields.idProof.type != "") {
      htmlIdProof = (
        <div className="column is-two-thirds">
          <div className="columns">
            <div className="column is-one-third">
              <div className="field">
                <label className="col-form-label" htmlFor="file-idproof">
                  {" "}
                  Photo copy of {this.state.fields.idProof.type}
                </label>
                <div className="input-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      className={`custom-file-input ${this.errorClass(
                        this.state.errors.idProof.document
                      )}`}
                      id="file-idproof"
                      onChange={e => this.handleIdProofImageChange(e)}
                    />
                    <label className="custom-file-label" htmlFor="file-idproof">
                      Choose file
                    </label>
                  </div>
                </div>
                <span className="error">
                  {this.state.errors.idProof.document}
                </span>
              </div>
            </div>
            <div className="column is-two-thirds">
              <div className="imgPreview">{$idProofDocumentPreview}</div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container mt-0">
        <h4 className="title is-4 text-center mt-4 mb-4">
          {" "}
          {this.state.editMode ? "UPDATE USER" : "CREATE NEW USER"}{" "}
        </h4>
        <form onSubmit={this.onSubmit}>
          {/* <div className="panel panel-default">
            <FormErrors formErrors={this.state.errors} />
          </div> */}
          <div className="columns">
            <div className="column is-one-third">
              <div className="field">
                <label className="label" htmlFor="accountHolderName">
                  {" "}
                  Name
                </label>
                <div className="control">
                  <input
                    className={`input ${this.errorClass(
                      this.state.errors.accountHolderName
                    )}`}
                    type="text"
                    name="accountHolderName"
                    id="accountHolderName"
                    value={this.state.fields.accountHolderName || ""}
                    onChange={event => this.handleUserInput(event)}
                  />
                </div>
                <span className="error">
                  {this.state.errors.accountHolderName}
                </span>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="field">
                <label className="col-form-label" htmlFor="email">
                  {" "}
                  Email{" "}
                </label>
                <input
                  className={`input ${this.errorClass(
                    this.state.errors.email
                  )}`}
                  type="text"
                  name="email"
                  id="email"
                  value={this.state.fields.email || ""}
                  onChange={event => this.handleUserInput(event)}
                />
                <span className="error">{this.state.errors.email}</span>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="field">
                <label className="col-form-label" htmlFor="contact">
                  Contact
                </label>
                <input
                  className={`input ${this.errorClass(
                    this.state.errors.contact
                  )}`}
                  type="text"
                  name="contact"
                  id="contact"
                  value={this.state.fields.contact || ""}
                  maxLength="11"
                  onChange={event => this.handleUserInput(event)}
                />
                <span className="error">{this.state.errors.contact}</span>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-one-third">
              <div className="field">
                <label className="col-form-label" htmlFor="userType">
                  {" "}
                  User Role/Type{" "}
                </label>
                <select
                  className={`input ${this.errorClass(
                    this.state.errors.userType
                  )}`}
                  name="userType"
                  id="userType"
                  value={this.state.fields.userType || ""}
                  onChange={event => this.handleUserInput(event)}
                >
                  <option value="">SELECT USER ROLE</option>
                  <option value="admin">ADMIN</option>
                  <option value="on-field-user">ON-FIELD-USER</option>
                  <option value="vendor">VENDOR</option>
                  <option value="customer">CUSTOMER</option>
                </select>
                <span className="error">{this.state.errors.userType}</span>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="field">
                <label className="col-form-label" htmlFor="password">
                  Password
                </label>
                <input
                  className={`input ${this.errorClass(
                    this.state.errors.password
                  )}`}
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.fields.password || ""}
                  onChange={event => this.handleUserInput(event)}
                />
                <span className="error">{this.state.errors.password}</span>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="field">
                <label className="col-form-label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  className={`input ${this.errorClass(
                    this.state.errors.confirmPassword
                  )}`}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={this.state.fields.confirmPassword || ""}
                  onChange={event => this.handleUserInput(event)}
                />
                <span className="error">
                  {this.state.errors.confirmPassword}
                </span>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-one-third">
              <div className="field">
                <label
                  htmlFor="dropdown-addressType"
                  className="col-form-label"
                >
                  {" "}
                  Proof of Residence{" "}
                </label>
                <select
                  className={`input ${this.errorClass(
                    this.state.errors.addressProof.type
                  )}`}
                  name="dropdown-addressType"
                  id="dropdown-addressType"
                  value={this.state.fields.addressProof.type || ""}
                  onChange={this.onAddressTypeChanged}
                >
                  <option value="">SELECT DOCUMENT TYPE</option>
                  <option value="aadhar-card">AADHAR CARD</option>
                  <option value="driving-license">DRIVING LICENSE</option>
                  <option value="passport">PASSPORT</option>
                  <option value="bank-passbook">BANK PASSBOOK</option>
                  <option value="electricity-bill">ELECTRICITY BILL</option>
                  <option value="gas-bill">GAS BILL</option>
                  <option value="water-bill">WATER BILL</option>
                  <option value="ration-card">RATION CARD</option>
                </select>
                <span className="error">
                  {this.state.errors.addressProof.type}
                </span>
              </div>
            </div>
            {htmlAddressProof}
          </div>
          <div className="columns">
            <div className="column is-one-third">
              <div className="field">
                <label htmlFor="dropdown-idType" className="col-form-label">
                  {" "}
                  Proof of ID{" "}
                </label>
                <select
                  className={`input ${this.errorClass(
                    this.state.errors.idProof.type
                  )}`}
                  name="dropdown-idType"
                  id="dropdown-idType"
                  value={this.state.fields.idProof.type || ""}
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
                <span className="error">{this.state.errors.idProof.type}</span>
              </div>
            </div>
            {htmlIdProof}
          </div>
          <div className="columns">
            <div className="column is-one-third">
              <div className="field">
                <div className="file has-name is-boxed">
                  <label className="file-label">
                    <input
                      type="file"
                      className={`file-input ${this.errorClass(
                        this.state.errors.photo
                      )}`}
                      id="file-user-photo"
                      onChange={e => this.handlePhotoChange(e)}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <svg className="uh-icon uh-icon-upload">
                          <use xlinkHref="assets/img/sprite.svg#icon-upload"></use>
                        </svg>
                      </span>
                      <span className="file-label">Upload Photo…</span>
                    </span>
                    <span className="file-name">
                      {
                        this.state.fields.addressProof.document
                          .original_filename
                      }
                    </span>
                  </label>
                </div>

                <span className="error">{this.state.errors.photo}</span>
              </div>
            </div>
            <div className="column is-two-thirds">
              <div className="imgPreview">{$photoPreview}</div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-one-third">
              <div className="field">
                <legend className="col-form-label mt-3"> Gender </legend>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="rdo-male"
                    value="Male"
                    checked={this.state.fields.gender === "Male"}
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
                    checked={this.state.fields.gender === "Female"}
                    onChange={event => this.handleUserInput(event)}
                  />
                  <label className="form-check-label" htmlFor="rdo-female">
                    Female
                  </label>
                </div>
                <span className="error">{this.state.errors.gender}</span>
              </div>
            </div>
          </div>
          <div className="buttons">
            <button className="button is-primary" type="submit">
              SUBMIT
            </button>
            <button
              className="button is-link is-light"
              onClick={() => this.props.history.push("/users")}
            >
              <i className="fas fa-chevron-left"></i>GO BACK
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default UserForm;

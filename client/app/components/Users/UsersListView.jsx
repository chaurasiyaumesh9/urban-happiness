import React from "react";
import { Link } from "react-router-dom";

const UsersListView = props => (
  <div className="users-list-wrapper">
    <div className="users-list mobile d-md-none">
      {props.list.map((user, i) => {
        return (
          <div className="row" key={i}>
            <div className="col-sm-12 col-sm-6">
              <div className="card bg-light">
                <div className="card-header text-center">
                  {" "}
                  {user.accountHolderName} <b>[*{user.userType}]</b>
                </div>
                <img
                  className="card-img-top"
                  src={user.photo.secure_url || user.photo.url}
                  alt={user.accountHolderName}
                />

                <div className="card-body">
                  <div className="user-details">
                    <span className="field-icon">
                      <b>
                        <i className="fas fa-phone-alt"></i>
                      </b>
                    </span>
                    <span className="field-data">{user.contact}</span>
                  </div>
                  <div className="user-details">
                    <span className="field-icon">
                      <b>
                        <i className="fas fa-envelope-open-text"></i>
                      </b>
                    </span>
                    <span className="field-data">{user.email}</span>
                  </div>
                  <div className="buttons-set text-center mt-2">
                    <Link
                      className="btn btn-primary edit-user mr-1"
                      to={`/users/${user._id}`}
                    >
                      <i className="fas fa-user-edit"></i> EDIT
                    </Link>

                    <button
                      onClick={i => this.deleteUser(user._id)}
                      className="btn btn-danger delete-user"
                    >
                      <i className="fas fa-trash"></i> DELETE
                    </button>
                  </div>
                </div>
              </div>
              <hr className="divider" />
            </div>
          </div>
        );
      })}
    </div>
    <div className="users-list browser d-none d-md-block">
      <table className="table">
        <thead>
          <tr>
            <th className="text-right" scope="col">
              #
            </th>
            <th className="text-left" scope="col">
              USER NAME
            </th>
            <th className="text-left" scope="col">
              CONTACT
            </th>
            <th className="text-left" scope="col">
              EMAIL
            </th>
            <th className="text-left" scope="col">
              ROLE
            </th>
            <th className="text-left" scope="col">
              PHOTO
            </th>
            <th className="text-right" scope="col">
              {" "}
              ACTION(S){" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((user, i) => {
            return (
              <tr key={i}>
                <th className="text-right" scope="row">
                  {i + 1}
                </th>
                <td className="text-left">{user.accountHolderName}</td>
                <td className="text-left">{user.contact}</td>
                <td className="text-left">{user.email}</td>
                <td className="text-left">{user.userType}</td>
                <td className="text-left">
                  <div className="user-photo-preview">
                    <img
                      src={user.photo.secure_url || user.photo.url}
                      alt={user.accountHolderName}
                    />
                  </div>
                </td>
                <td className="text-right">
                  <Link
                    className="btn btn-sm btn-primary edit-user mr-1"
                    to={`/users/${user._id}`}
                  >
                    <i className="fas fa-user-edit"></i> EDIT
                  </Link>

                  <button
                    onClick={i => this.deleteUser(user._id)}
                    className="btn btn-sm btn-danger delete-user"
                  >
                    <i className="fas fa-trash"></i> DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default UsersListView;

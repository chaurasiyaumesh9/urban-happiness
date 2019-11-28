import React from "react";
import { Link } from "react-router-dom";

const UsersListView = props => (
  <div className="users-list-wrapper">
    <div className="users-list mobile is-hidden-tablet">
      {props.list.map((user, i) => {
        return (
          <div className="card" key={i}>
            <header className="card-header">
              <p className="card-header-title">
                {user.accountHolderName} <b>[*{user.userType}]</b>
              </p>
            </header>
            <div className="card-image">
              <figure className="image">
                <img
                  src={user.photo.secure_url || user.photo.url}
                  alt={user.accountHolderName}
                />
              </figure>
            </div>
            <div className="card-content">
              <h4 className="panel">
                <span className="uh-icon phone-icon">
                  <svg className="uh-icon-phone">
                    <use xlinkHref="assets/img/sprite.svg#icon-phone"></use>
                  </svg>
                </span>
                <span className="subtitle is-6">{user.contact}</span>
              </h4>
              <h6 className="panel">
                <span className="uh-icon icon-envelop">
                  <svg className="uh-icon-envelop">
                    <use xlinkHref="assets/img/sprite.svg#icon-envelop"></use>
                  </svg>
                </span>
                <span className="subtitle is-6">{user.email}</span>
              </h6>
            </div>
            <footer className="card-footer">
              <p className="card-footer-item">
                <Link
                  className="button is-link is-light is-normal edit-user mr-1"
                  to={`/users/${user._id}`}
                >
                  <i className="fas fa-user-edit"></i> EDIT
                </Link>
              </p>
              <p className="card-footer-item">
                <button
                  onClick={i => this.deleteUser(user._id)}
                  className="button is-danger is-light is-normal delete-user"
                >
                  <i className="fas fa-trash"></i> DELETE
                </button>
              </p>
            </footer>
            <hr />
          </div>
        );
      })}
    </div>
    <div className="users-list browser is-hidden-mobile">
      <div className="table-container">
        <table className="table is-fullwidth table is-striped">
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
              {/* <th className="text-left" scope="col">
                PHOTO
              </th> */}
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
                  <td className="text-right" scope="row">
                    {i + 1}
                  </td>
                  <td className="text-left">{user.accountHolderName}</td>
                  <td className="text-left">{user.contact}</td>
                  <td className="text-left">{user.email}</td>
                  <td className="text-left">{user.userType}</td>
                  {/* <td className="text-left">
                    <div className="user-photo-preview">
                      <img
                        src={user.photo.secure_url || user.photo.url}
                        alt={user.accountHolderName}
                      />
                    </div>
                  </td> */}
                  <td className="text-right">
                    <div className="buttons">
                      <Link
                        className="button is-link is-light is-normal"
                        to={`/users/${user._id}`}
                      >
                        <i className="fas fa-user-edit"></i> EDIT
                      </Link>
                      <button
                        onClick={i => this.deleteUser(user._id)}
                        className="button is-danger is-light is-normal delete-user"
                      >
                        <i className="fas fa-trash"></i> DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default UsersListView;

import React from "react";
import { Link } from "react-router-dom";
import "whatwg-fetch";

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  deleteUser = userid => {
    if (!userid) return;
    fetch("/api/users/" + userid, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(json => {
        this.props.setNotification({
          type: "success",
          message: "Record Deleted Successfully!!",
          show: true
        });
      })
      .catch(e => console.log(e));
  };

  fetchUsersList = () => {
    fetch("/api/users")
      .then(res => res.json())
      .then(json => {
        this.setState({
          users: json
        });
      });
  };
  componentDidMount() {
    this.fetchUsersList();
  }

  newUser = () => {
    fetch("/api/users", { method: "POST" })
      .then(res => res.json())
      .then(json => {
        let data = this.state.users;
        data.push(json);

        this.setState({
          users: data
        });
      });
  };

  render() {
    const userjsx = this.state.users.map((user, i) => {
      return (
        <tr key={i}>
          <th className="text-right" scope="row">
            {i + 1}
          </th>
          <td className="text-left">
            {user.firstName} {user.lastName}
          </td>
          <td className="text-left">{user.contact}</td>
          <td className="text-left">{user.username}</td>
          <td className="text-left">{user.address}</td>
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
    });
    const listLength = this.state.users.length;
    let userTable = null;
    if (listLength) {
      userTable = (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="text-right" scope="col">
                  #
                </th>
                <th className="text-left" scope="col">
                  NAME
                </th>
                <th className="text-left" scope="col">
                  CONTACT
                </th>
                <th className="text-left" scope="col">
                  USERNAME
                </th>
                <th className="text-left" scope="col">
                  ADDRESS
                </th>
                <th className="text-right" scope="col">
                  {" "}
                  ACTION(S){" "}
                </th>
              </tr>
            </thead>
            <tbody>{userjsx}</tbody>
          </table>
        </div>
      );
    } else {
      userTable = (
        <div className="no-data text-center">
          <hr />
          <h4 className="title text-center mt-4 mb-4"> NO DATA FOUND!! </h4>
        </div>
      );
    }

    return (
      <div className="container">
        {/* <div className="jumbotron text-center">
          <h4>
            <i className="fas fa-users-cog"></i> MANAGE USERS
          </h4>
        </div> */}
        <h4 className="title text-center mt-4 mb-4"> MANAGE USERS </h4>

        {userTable}
        <Link className="btn btn-sm btn-primary" to="/users/create">
          <i className="fas fa-plus"></i> New User
        </Link>
        <hr />
      </div>
    );
  }
}
export default UsersList;

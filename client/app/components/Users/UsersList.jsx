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
  componentDidMount() {
    fetch("/api/users")
      .then(res => res.json())
      .then(json => {
        this.setState({
          users: json
        });
      });
  }

  newUser() {
    fetch("/api/users", { method: "POST" })
      .then(res => res.json())
      .then(json => {
        let data = this.state.users;
        data.push(json);

        this.setState({
          users: data
        });
      });
  }

  render() {
    const userjsx = this.state.users.map((user, i) => {
      return (
        <tr key={i}>
          <th scope="row">{i + 1}</th>
          <td>
            {user.firstName} {user.lastName}
          </td>
          <td>{user.contact}</td>
          <td>{user.username}</td>
          <td>
            <Link className="edit-user" to={`/users/${user._id}`}>
              <i className="fas fa-user-edit"></i>
            </Link>
          </td>
        </tr>
      );
    });
    return (
      <div className="container">
        <div className="jumbotron text-center">
          <h3>
            <i className="fas fa-users-cog"></i> MANAGE USERS
          </h3>
        </div>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Contact</th>
                <th scope="col">Username</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>{userjsx}</tbody>
          </table>
        </div>
        <button className="btn btn-primary">New User</button>
      </div>
    );
  }
}
export default UsersList;

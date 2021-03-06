import React from "react";
import { Link } from "react-router-dom";
import UsersListView from "./UsersListView";
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
    this.props.setLoaderStatus(true);
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
          message: "User Deleted Successfully!!",
          show: true
        });
        this.props.setLoaderStatus(false);
        this.fetchUsersList();
      })
      .catch(e => console.log(e));
  };

  fetchUsersList = () => {
    this.props.setLoaderStatus(true);
    fetch("/api/users")
      .then(res => res.json())
      .then(json => {
        this.setState({
          users: json
        });
        this.props.setLoaderStatus(false);
      });
  };
  componentDidMount() {
    this.fetchUsersList();
  }

  render() {
    return (
      <div className="container">
        <h4 className="title is-4 text-center mt-4 mb-4"> MANAGE USERS </h4>
        <UsersListView list={this.state.users} />
        <div className="buttons">
          <Link className="button is-primary" to="/users/create">
            <i className="fas fa-plus"></i> New User
          </Link>
        </div>

        <hr />
      </div>
    );
  }
}
export default UsersList;

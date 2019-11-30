import React from "react";
import { Link } from "react-router-dom";
import UsersListView from "./UsersListView";
import { createSorter } from "../../utils/sort";

import "whatwg-fetch";

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      sorters: [
        {
          property: "accountHolderName",
          direction: "DESC"
        }
      ]
    };
  }
  formatDate = dateString => {
    let options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleTimeString([], options);
  };
  ModifyUsers = usersList => {
    usersList.forEach(user => {
      user.signUpDate = this.formatDate(user.signUpDate);
    });
    return usersList;
  };
  applySort = (e, fieldName) => {
    e.preventDefault();
    const { sorters, users } = this.state;
    this.setState({
      sorters: [
        {
          property: fieldName,
          direction: sorters[0].direction === "DESC" ? "ASC" : "DESC"
        }
      ],
      users: users
    });
    users.sort(createSorter(...sorters));
  };
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
    const { sorters } = this.state;
    fetch("/api/users")
      .then(res => res.json())
      .then(json => {
        let users = this.ModifyUsers(json);
        if (Array.isArray(sorters) && sorters.length) {
          users.sort(createSorter(...sorters));
        }

        this.setState({
          users: users
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
        <UsersListView list={this.state.users} sortMethod={this.applySort} />
        <div className="buttons">
          <Link className="button is-link" to="/users/create">
            <i className="fas fa-plus"></i> New User
          </Link>
        </div>

        <hr />
      </div>
    );
  }
}
export default UsersList;

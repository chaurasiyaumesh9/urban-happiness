import React from "react";

const Notifications = ({ closeHandler, notification }) => (
  <div className="container">
    <div
      className={`notification is-primary alert-${notification.type} alert-dismissible fade show`}
      role="alert"
    >
      <strong>{notification.message}</strong>
      <button
        type="button"
        className="close delete"
        data-dismiss="alert"
        aria-label="Close"
        onClick={() =>
          closeHandler({
            type: null,
            message: "",
            show: false
          })
        }
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
);

export default Notifications;

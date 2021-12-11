import React, { Component } from "react";
import store from "./store";
import { connect } from "react-redux";

const Users = ({ users }) => {
  return (
    <ul>
      {users.map((user) => {
        return <li key={user.id}>{user.name}</li>;
      })}
    </ul>
  );
};

//!another way of doing mapStateToProps & connecting it
export default connect(({ users }) => {
  // deconstruct the state aka user and return it like mapStateToProps
  return {
    users,
  };
})(Users);

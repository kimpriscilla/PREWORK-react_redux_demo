import React, { Component } from "react";
import store from "./store";
import axios from "axios";

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      users: store.getState().users,
    };
  }
  async createUser() {
    const user = (await axios.post("/api/users")).data;
    //console.log(user);
    store.dispatch({
      type: "CREATE_USERS",
      user,
    });
  }
  componentDidMount() {
    // console.log(store.getState().users);
    store.subscribe(() => {
      this.setState({
        users: store.getState().users,
      });
    });
  }
  render() {
    const { users } = this.state;
    const { createUser } = this;
    return (
      <nav>
        <a href="">HOME</a>
        <a href="#users">USERS ({users.length})</a>
        <button onClick={createUser}>Create User</button>
      </nav>
    );
  }
}
export default Nav;

import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";
import Users from "./Users";
import Nav from "./Nav";
import store from "./store";

console.log(store);

class App extends Component {
  constructor() {
    super();
    this.state = { ...store.getState(), view: "" }; //! get the current state from the store
    // this.state = {
    //   users: [],
    //   loading: true
    // };
  }
  async componentDidMount() {
    window.addEventListener("hashchange", () => {
      this.setState({ view: window.location.hash.slice(1) });
    });
    this.setState({ view: window.location.hash.slice(1) });
    const users = (await axios.get("/api/users")).data;

    store.subscribe(() => {
      //!when the store ends up changing, we're going to set the state for our application
      this.setState(store.getState());
    });

    store.dispatch({
      // ! DISPATCHING TO THE STORE aka changes the action type
      type: "LOAD_USERS",
      users,
    });
    store.dispatch({
      type: "LOADED",
    });

    // this.setState({
    //   users: (await axios.get("/api/users")).data,
    //   loading: false,
    // });
  }
  render() {
    const { loading, view } = this.state;
    if (loading) {
      return "....loading";
    }
    return (
      <div>
        <Nav />
        {view === "" ? <div>HOME</div> : <Users />}
      </div>
    );
  }
}

render(<App />, document.querySelector("#root"));

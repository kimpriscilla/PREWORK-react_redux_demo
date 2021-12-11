import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";
import Users from "./Users";
import Nav from "./Nav";
import store from "./store";
import { Provider, connect } from "react-redux";

console.log(store);

class _App extends Component {
  constructor() {
    super();
    this.state = { view: "" };
  }
  async componentDidMount() {
    window.addEventListener("hashchange", () => {
      this.setState({ view: window.location.hash.slice(1) });
    });
    this.setState({ view: window.location.hash.slice(1) });

    this.props.load(); //!will get called when App loads

    // const users = (await axios.get("/api/users")).data;
    // store.dispatch({
    //   // ! DISPATCHING TO THE STORE aka changes the action type
    //   type: "LOAD_USERS",
    //   users,
    // });
    // store.dispatch({
    //   type: "LOADED",
    // });
  }
  render() {
    const { view } = this.state;
    const { loading } = this.props;
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

const mapStateToProps = ({ loading }) => {
  return {
    loading,
  };
}; //!THIS GETS CALLED FOR US, WE DONT CALL IT! a method that ends up getting passed the state as parameter and by returning the state, this would end up passing the state as props
//!mapStateToProps always returns a plain object, our state is an object

const mapDispatchToProps = (dispatch) => {
  return {
    load: async () => {
      const users = (await axios.get("/api/users")).data;
      dispatch({
        // ! DISPATCHING TO THE STORE aka changes the action type
        type: "LOAD_USERS",
        users,
      });
      dispatch({
        type: "LOADED",
      });
    },
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

render(
  <Provider store={store}>
    <App />{" "}
  </Provider>,
  document.querySelector("#root")
);

//! 1) once App is loaded, will go back to server, take a few seconds and come back to mapDispatchToProps
//! 2) dipatch to store, state will end up changing (UNDER RENDER!!) not gonna end up being loaded anymore so it will render/loading the next component

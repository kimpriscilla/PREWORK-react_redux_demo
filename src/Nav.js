import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

// const createUser = async () => {
//   const user = (await axios.post("/api/users")).data;
//   //console.log(user);
//   store.dispatch({
//     type: "CREATE_USERS",
//     user,
//   });
// };

const Nav = ({ count, createUser }) => {
  return (
    <nav>
      <a href="">HOME</a>
      <a href="#users">USERS ({count})</a>
      <button onClick={createUser}>Create User</button>
    </nav>
  );
};

const mapDispatchToProps = (dispatch) => {
  //! now createUser will end up getting passed in as props
  //! DISPATCHING TO THE REDUX STORE
  return {
    createUser: async () => {
      const user = (await axios.post("/api/users")).data;
      //console.log(user);
      dispatch({
        type: "CREATE_USERS",
        user,
      });
    },
  };
}; //? gets passed the dispatch method. Works the same way as mapStateToProps. will get passed in as props

const mapStateToProps = ({ users }) => {
  //!a method that ends up getting passed the state as parameter and by returning the state, this would end up passing the state as props. ALWAYS RETURNS PLAIN OBJECT
  //!SUBSCRIBING TO THE REDUX STORE
  return {
    count: users.length,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Nav);

import { createStore } from "redux";

const initialState = {
  users: [],
  loading: true,
};
const store = createStore((state = initialState, action) => {
  //! PURE FUNCTION

  //! inside createStore is a reducer function
  if (action.type === "LOAD_USERS") {
    state = { ...state, users: action.users }; //! To avoid mutating the state. Start with a copy(...), then only make changes to the parts you want to. aka take whatever the state was before and only change what we need to change
  }
  if (action.type === "LOADED") {
    state = { ...state, loading: false };
  }
  if (action.type === "CREATE_USERS") {
    state = { ...state, users: [...state.users, action.user] };
  }

  return state;
});

export default store;

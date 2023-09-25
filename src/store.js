import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  responseData: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_RESPONSE_DATA":
      return { ...state, responseData: action.payload };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    app: reducer,
  },
});

export default store;

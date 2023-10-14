import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./features/token/tokenSlice";
import userReducer from "./features/user/userSlice";
import saveEmailReducer from "./features/saveEmail/saveEmailSlice";

//MIDDLEWARE
const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("applicationState", JSON.stringify(getState()));
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem("applicationState") !== null) {
    return JSON.parse(localStorage.getItem("applicationState")); // re-hydrate the store
  }
};

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
    mail: saveEmailReducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

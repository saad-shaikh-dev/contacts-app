import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthenticationToken from "../../utilities/setAuthenticationToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    error: null,
    loading: true,
  };

  // dispatching functions
  const [state, dispatch] = useReducer(authReducer, initialState);

  // load user data
  const loadUser = async () => {
    // load token into global headers
    setAuthenticationToken(localStorage.token);
    try {
      const response = await axios.get("/api/auth");
      // if user exists
      dispatch({ type: USER_LOADED, payload: response.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // register user
  const register = async formData => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const response = await axios.post("/api/users", formData, config);
      // if registration successful
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      // load user data
      loadUser();
    } catch (err) {
      // if registration failed
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.message });
    }
  };

  // login
  const login = async formData => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const response = await axios.post("/api/auth", formData, config);
      // if registration successful
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      // load user data
      loadUser();
    } catch (err) {
      // if registration failed
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.message });
    }
  };

  // logout
  const logout = () => dispatch({ type: LOGOUT });

  // clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

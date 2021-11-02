import React, { useState, useEffect, useContext, Fragment } from "react";
import Alerts from "../alert/Alerts";
import AuthContext from "../../context/authentication/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = props => {
  // import authentication functions
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;
  // import alert functions
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // functions on changes
  useEffect(() => {
    // redirect to home page if authenticated
    if (isAuthenticated) props.history.push("/");
    // if user already exists
    if (error === "This email address is not registered") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  // set default input values
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  // on text input
  const onChange = change =>
    setUser({ ...user, [change.target.name]: change.target.value });

  // login attempt
  const onSubmit = submit => {
    submit.preventDefault();
    login({ email, password });
  };

  return (
    <Fragment>
      <form className="registration-form" onSubmit={onSubmit}>
        <h2>Login</h2>
        <Alerts />
        <input
          className="input-field registration-field"
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          required
        />
        <input
          className="input-field registration-field"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Enter a password"
          required
        />
        <input
          className="button button-submit registration-field"
          type="submit"
          value="Login"
        />
      </form>
      <br />
      <p className="signature">This website was developed by <a href="https://saad-shaikh-portfolio.netlify.app/" target="_blank">Saad Shaikh</a></p>
    </Fragment>
  );
};

export default Login;

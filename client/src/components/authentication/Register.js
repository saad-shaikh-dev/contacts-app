import React, { Fragment, useContext, useEffect, useState } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/authentication/authContext";
import Alerts from "../alert/Alerts";

const Register = props => {
  // import authentication functions
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;
  // import alert functions
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // functions on changes
  useEffect(() => {
    // redirect to home page if authenticated
    if (isAuthenticated) props.history.push("/");
    // if user already exists
    if (error === "This user already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  // set default input value
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const { name, email, password, passwordConfirmation } = user;

  // update temporary value
  const onChange = change =>
    setUser({ ...user, [change.target.name]: change.target.value });

  // register the user
  const onSubmit = submit => {
    submit.preventDefault();
    // check if input is correct
    if (password !== passwordConfirmation) {
      setAlert("Passwords don't match", "danger");
    }
    // register user
    else register({ name, email, password });
  };

  return (
    <Fragment>
      <form className="registration-form" onSubmit={onSubmit}>
        <h2>Register with us</h2>
        <input
          className="input-field registration-field"
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          required
        />
        <input
          className="input-field registration-field"
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          required
        />
        {/* password fields */}
        <input
          className="input-field registration-field"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Enter a password"
          minLength="8"
          required
        />
        <input
          className="input-field registration-field"
          type="password"
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={onChange}
          placeholder="Confirm your password"
          minLength="8"
          required
        />
        <input
          className="button button-submit registration-field"
          type="submit"
          value="Register"
        />
        <Alerts />
      </form>
      <br />
      <p className="signature">This website was developed by <a href="https://saad-shaikh-portfolio.netlify.app/" target="_blank">Saad Shaikh</a></p>
    </Fragment>
  );
};

export default Register;

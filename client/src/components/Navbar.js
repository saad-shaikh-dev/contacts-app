import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authentication/authContext";
import ContactContext from "../context/contact/contactContext";

const Navbar = ({ title, icon }) => {
  // import authentication context
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;
  // import contact context
  const contactContext = useContext(ContactContext);
  const { clearContacts } = contactContext;

  // logout function
  const onLogout = () => {
    logout();
    clearContacts();
  };

  return (
    <div className="navbar">
      <div className="nav-title">
        <h1>
          <Link className="navlink" to="/">
            Contacts App
          </Link>
        </h1>
      </div>

      <div className="navlinks">
        {isAuthenticated ? (
          <Fragment>
            <Fragment>
              Welcome <strong>{user && user.name}</strong>
            </Fragment>
            <Link className="navlink" to="#!" onClick={onLogout}>
              Logout
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Link className="navlink" to="/register">
              Register
            </Link>
            <Link className="navlink" to="/login">
              Login
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Navbar;

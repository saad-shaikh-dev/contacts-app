import React, { Fragment, useContext, useEffect } from "react";
import ContactForm from "../contacts/ContactForm";
import Contacts from "../contacts/Contacts";
import AuthContext from "../../context/authentication/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  useEffect(() => {
    // keep the user info logged in
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {isAuthenticated ? (
        <div className="home-layout">
          <div className="add-contact-div">
            <ContactForm />
          </div>
          <div className="my-contacts-div">
            <Contacts />
          </div>
        </div>
      ) : (
        <Fragment>Loading...</Fragment>
      )}
    </Fragment>
  );
};

export default Home;

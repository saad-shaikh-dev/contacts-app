import React, { Fragment, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactSearch from "./ContactSearch";
import ContactCard from "./ContactCard";

const Contacts = () => {
  // import context
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, readContacts, loading } = contactContext;

  // use effect
  useEffect(() => {
    readContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && !contacts.length && !loading)
    return <p className="no-contacts">You have no contacts</p>;

  return (
    <Fragment>
      <h2>My contacts</h2>
      <ContactSearch />
      <div className="contacts-list">
        {filtered
          ? filtered.map(contact => (
              <ContactCard key={contact._id} contact={contact} />
            ))
          : contacts.map(contact => (
              <ContactCard key={contact._id} contact={contact} />
            ))}
      </div>
    </Fragment>
  );
};

export default Contacts;

import React, { useContext, Fragment } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";

// cRUD - Read and Delete contacts, link to Update contact
const ContactCard = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const {
    deleteContact,
    setCurrentContact,
    clearCurrentContact,
    clearContactSearch,
  } = contactContext;
  const { _id, name, email, phone, type } = contact;

  // update method
  const onUpdate = () => setCurrentContact(contact);
  //delete method
  const onDelete = () => {
    deleteContact(_id);
    // clear any updating so deleted contacts cannot be updated
    clearCurrentContact();
    clearContactSearch();
  };

  return (
    <div className="contact-card">
      <h3>
        {name}
        <span
          className={
            "badge " +
            (type === "work" ? "badge-work" : "badge-personal")
          }
        >
          {type}
        </span>
      </h3>
      <ul className="contact-details">
        <li>
          <i className="fas fa-envelope-open"></i>&nbsp;&nbsp;
          {email ? <Fragment>{email}</Fragment> : <Fragment>No email</Fragment>}
        </li>
        <li>
          <i className="fas fa-phone"></i>&nbsp;&nbsp;
          {phone ? (
            <Fragment>{phone}</Fragment>
          ) : (
            <Fragment>No phone number</Fragment>
          )}
        </li>
      </ul>
      <p>
        <a href="#contact-form">
          <button className="button button-edit" onClick={onUpdate}>
            Edit
          </button>
        </a>
        <button className="button button-delete" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactCard;

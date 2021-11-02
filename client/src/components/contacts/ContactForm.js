import React, { useState, useContext, useEffect, Fragment } from "react";
import ContactContext from "../../context/contact/contactContext";

// CrUd - Create and Update contact
const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { createContact, clearCurrentContact, updateContact, current } =
    contactContext;
  // add contact details of current contact if edit button is clicked
  useEffect(() => {
    current
      ? setContact(current)
      : setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
  }, [contactContext, current]);

  // default values of the contact form
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });
  const { name, email, phone, type } = contact;

  // add values to temporary object
  const onChange = change =>
    setContact({ ...contact, [change.target.name]: change.target.value });

  // if submit button is clicked
  const onSubmit = submit => {
    submit.preventDefault();
    // choose weather to create or update a contact
    !current ? createContact(contact) : updateContact(contact);
    // revert form to default values
    clearCurrentContact();
  };

  return (
    <Fragment>
      <a className="create-contact-link" href="#contact-form">
        <button className="create-contact-button" id="create-contact-button">
          +
        </button>
      </a>

      <form
        className="contact-form"
        id="contact-form"
        onSubmit={onSubmit} /* ref={(ref) => {
          inputEl.current = ref;
        }} */
      >
        <h2>{current ? "Update contact" : "Create contact"}</h2>
        {/* input fields */}
        <input
          className="input-field"
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          required
        />
        <input
          className="input-field"
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
        />
        <input
          className="input-field"
          minLength="8"
          maxLength="8"
          type="phone"
          name="phone"
          value={phone}
          onChange={onChange}
          placeholder="Phone"
        />
        {/* personal or work check box */}
        <div>
          <h3>Contact type</h3>
          <input
            type="radio"
            name="type"
            value="personal"
            checked={type === "personal"}
            onChange={onChange}
          />
          &nbsp; Personal &nbsp;
          <input
            type="radio"
            name="type"
            value="work"
            checked={type === "work"}
            onChange={onChange}
          />
          &nbsp; Work
        </div>
        {/* submit and clear button */}
        <div>
          <input
            className="button button-submit"
            type="submit"
            value={current ? "Update contact" : "Create contact"}
          />
          <a
            href="#create-contact-button"
            className="close-modal"
            onClick={clearCurrentContact}
          >
            x
          </a>
        </div>
      </form>
    </Fragment>
  );
};

export default ContactForm;

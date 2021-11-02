import React, { Fragment, useContext, useEffect, useRef } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactSearch = () => {
  const contactContext = useContext(ContactContext);
  const { searchContact, clearContactSearch, filtered } = contactContext;
  const text = useRef("");

  useEffect(() => {
    if (!filtered) text.current.value = "";
  });

  const onChange = changes => {
    text.current.value
      ? searchContact(changes.target.value)
      : clearContactSearch();
  };
  return (
    <form>
      <input
        className="input-field searchbar"
        ref={text}
        type="text"
        onChange={onChange}
        placeholder="Search contacts..."
      />
    </form>
  );
};

export default ContactSearch;

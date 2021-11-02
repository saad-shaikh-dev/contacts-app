import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  CREATE_CONTACT,
  READ_CONTACTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [],
    // temporary object to store the edits
    current: null,
    // search term value
    filtered: null,
    // error message
    error: null,
    // loading
    loading: true,
  };

  // dispatching functions
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // create contact
  const createContact = async contact => {
    // define header details
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      // connect to api post
      const response = await axios.post("/api/contacts", contact, config);
      // add the contact
      dispatch({ type: CREATE_CONTACT, payload: response.data });
    } catch (err) {
      // if registration failed
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.message });
    }
  };

  // read contacts
  const readContacts = async () => {
    // try to fetch contact
    try {
      // connect to api get
      const response = await axios.get("/api/contacts");
      // get the contacts
      dispatch({ type: READ_CONTACTS, payload: response.data });
    } catch (err) {
      // if registration failed
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.message });
    }
  };

  // update contact - 1 - defines the changes to the current contact
  const setCurrentContact = contact =>
    dispatch({ type: SET_CURRENT, payload: contact });
  // update contact - 2 - clear the edit field after changes are made
  const clearCurrentContact = () => dispatch({ type: CLEAR_CURRENT });

  // update contact - 3 - actually update the contact
  const updateContact = async contact => {
    // define header details
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      // connect to api post
      const response = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      // update the contact
      dispatch({ type: UPDATE_CONTACT, payload: response.data });
    } catch (err) {
      // if there is error
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.message });
    }
  };

  // delete contact - cruD
  const deleteContact = async id => {
    try {
      // connect to api delete
      await axios.delete(`/api/contacts/${id}`);
      // delete the contact
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      // in case of error
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.message });
    }
  };

  // clear contacts
  const clearContacts = () => dispatch({ type: CLEAR_CONTACTS });

  // filter contacts
  const searchContact = text =>
    dispatch({ type: FILTER_CONTACTS, payload: text });
  // clear filters
  const clearContactSearch = () => dispatch({ type: CLEAR_FILTER });

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        createContact,
        readContacts,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        deleteContact,
        clearContacts,
        searchContact,
        clearContactSearch,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;

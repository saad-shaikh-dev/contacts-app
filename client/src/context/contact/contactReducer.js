import {
  CREATE_CONTACT,
  READ_CONTACTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  CLEAR_CONTACTS,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from "../types";

// reducer
const contactReducer = (state, action) => {
  switch (action.type) {
    // create contact
    case CREATE_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false,
      };

    // read contact
    case READ_CONTACTS:
      return { ...state, contacts: action.payload, loading: false };

    // update contact
    case SET_CURRENT:
      return { ...state, current: action.payload };
    case CLEAR_CURRENT:
      return { ...state, current: null };
    case UPDATE_CONTACT:
      return {
        ...state,
        // if the id of current matches existing contact, update value, else old value
        contacts: state.contacts.map(contact =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false,
      };

    // delete contact
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        ),
        loading: false,
      };

    // clear contacts
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: [],
        filtered: null,
        error: null,
        current: null,
      };

    // search contacts
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, `gi`);
          return contact.name.match(regex) || contact.phone.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return { ...state, filtered: null };

    // get error message
    case CONTACT_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default contactReducer;

// crud functionality route
const express = require("express"); // import express
const router = express.Router(); // import express(Router)
const auth = require("../middleware/auth"); // import from middleware
const { validationResult, check } = require("express-validator"); // import express validator

const User = require("../models/User"); // import User model
const Contact = require("../models/Contact"); // import Contact model

// cRud | GET api/contacts | Private
router.get("/", auth, async (request, response) => {
  try {
    // find all contacts
    const contacts = await Contact.find({ user: request.user.id }).sort({
      name: 1,
    });
    // get the contacts
    response.json(contacts);
  } catch (err) {
    console.error(err.message);
    response.status(500).send(`Server error`);
  }
});

// Crud | POST api/contacts | Private
router.post(
  "/",
  [
    auth,
    [check("name", "Please add a name for your new contact").not().isEmpty()],
  ],
  async (request, response) => {
    // check for errors
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    // if there are no errors
    const { name, email, phone, type } = request.body;
    // add a new contact
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: request.user.id,
      });
      // save new contact after it is created
      const contact = await newContact.save();
      response.json(contact);
    } catch (err) {
      console.error(err.message);
      response.status(500).send(`Server error`);
    }
  }
);

// crUd | PUT api/contacts/:id | Private
router.put("/:id", auth, async (request, response) => {
  const { name, email, phone, type } = request.body;
  // build contact object for updated contact info
  const contactFields = {};
  // make updated contact params = acutual contact params
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    // check if contact exists
    let contact = await Contact.findById(request.params.id);
    if (!contact)
      return response
        .status(404)
        .json({ message: `This contact does not exist` });
    // check if user owns contact
    if (contact.user.toString() !== request.user.id) {
      return response
        .status(401)
        .json({ message: `This use is not authorised` });
    }
    // update the contact
    contact = await Contact.findByIdAndUpdate(
      request.params.id,
      { $set: contactFields },
      { new: true } // if it doen't exist create a new one
    );
    // publish updated contact
    response.json(contact);
  } catch (err) {
    console.error(err.message);
    response.status(500).send(`Server error`);
  }
});

// cruD | DELETE api/contacts/:id | Private
router.delete("/:id", auth, async (request, response) => {
  try {
    // check if contact exists
    let contact = await Contact.findById(request.params.id);
    if (!contact)
      return response
        .status(404)
        .json({ message: `This contact does not exist` });
    // check if user owns contact
    if (contact.user.toString() !== request.user.id) {
      return response
        .status(401)
        .json({ message: `This use is not authorised` });
    }
    // delete the contact
    await Contact.findByIdAndRemove(request.params.id);
    // publish updated contact
    response.json({ message: `Contact was deleted` });
  } catch (err) {
    console.error(err.message);
    response.status(500).send(`Server error`);
  }
});

module.exports = router; // export functions to express.Router

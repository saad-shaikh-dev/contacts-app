// register a user route
const express = require("express"); // import express
const router = express.Router(); // shortcut for router
const bcrypt = require("bcryptjs"); // import bcrypt
const jsonwebtoken = require("jsonwebtoken");
const config = require("config");
const { body, validationResult, check } = require("express-validator"); // import express validator

const User = require("../models/User"); // import User model

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  "/",
  [
    check("name", "Please add a name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please create a password with 8 or more characters"
    ).isLength({ min: 8 }),
  ],
  async (request, response) => {
    // check for errors
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    // if there are no errors
    const { name, email, password } = request.body;
    try {
      // check if user email exists
      let user = await User.findOne({ email });
      if (user) {
        return response
          .status(400)
          .json({ message: `This user already exists` });
      }
      // create new user
      user = new User({ name, email, password });
      /* encrypt the password */
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);
      // save new user
      await user.save();
      // create json web token
      const payload = { user: { id: user.id } };
      jsonwebtoken.sign(
        payload,
        config.get("jsonWebTokenSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          response.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      response.status(500).send(`Server error`);
    }
  }
);

module.exports = router; // export functions to express.Router

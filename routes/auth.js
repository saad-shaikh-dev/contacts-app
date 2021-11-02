// login users route
const express = require("express"); // import express
const router = express.Router(); // shortcut for router
const bcrypt = require("bcryptjs"); // import bcrypt
const jsonwebtoken = require("jsonwebtoken");
const config = require("config"); // import config
const auth = require("../middleware/auth"); // import from middleware
const { body, validationResult, check } = require("express-validator"); // import express validator

const User = require("../models/User"); // import User model

// @route   GET api/auth
// @desc    Get logged in users
// @access  Private (done by auth)
router.get("/", auth, async (request, response) => {
  try {
    const user = await User.findById(request.user.id).select("-password");
    response.json(user);
  } catch (err) {
    console.error(err.message);
    response.status(500).send(`Server error`);
  }
});

// @route   POST api/auth
// @desc    Auth user and get token / enter login credentials
// @access  Public
router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter the password").exists(),
  ],
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { email, password } = request.body;
    try {
      // check if email exists
      let user = await User.findOne({ email });
      if (!user) {
        return response
          .status(400)
          .json({ message: "This email address is not registered" });
      }
      // check if password is correct
      const doesPasswordMatch = await bcrypt.compare(password, user.password);
      if (!doesPasswordMatch) {
        return response
          .status(400)
          .json({ message: "The password you entered is wrong" });
      }
      // get json web token
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

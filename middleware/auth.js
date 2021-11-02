// connect token from login to user credentials
const jsonwebtoken = require("jsonwebtoken"); // import jsonwebtoken
const config = require("config"); // import config
const { response } = require("express"); // auto imported express (response)

module.exports = (request, response, next) => {
  // get token from header
  const token = request.header("x-auth-token");
  // check if token exists
  if (!token) {
    return response
      .status(401)
      .json({ message: "No token, authorisation denied" });
  }
  // verify token
  try {
    const decoded = jsonwebtoken.verify(
      token,
      config.get("jsonWebTokenSecret")
    );
    request.user = decoded.user;
    next();
  } catch (err) {
    response.status(401).json({ message: "Token is not valid" });
  }
};

const { response } = require("express");
const express = require("express"); // import express
const connectDb = require("./config/db"); // import database connection
const path = require("path");

const app = express(); // initialise express to app

// connect to database
connectDb();

// init middleware
app.use(express.json({ extended: false }));

// define external routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
// use = routes in other files, require = path source

// serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  // load index.html in client build folder
  app.get("*", (request, response) =>
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000; // publish to production or development

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

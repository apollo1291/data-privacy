const express = require("express");
const cors = require("cors");
const path = require("path");
const userQuery = require("./Queries/userQueries");
const webQuery = require("./Queries/websiteQueries");
const cookieQuery = require("./Queries/cookieQueries");
const app = express(),
  bodyParser = require("body-parser");
const PORT = process.env.PORT || 3080;

//process.env.NODE_ENV

app.listen(PORT, () => {
  console.log(`Server listening on the port::${PORT}`);
});

//middleware
app.use(bodyParser.json());
app.use(cors());



// in production host the build folder within this server
// to test in development mode:
// start server on localhost 3080
// cd Frontend
// run npm start
// go to localhost 3000
if (process.env.NODE_ENV === "production") {
  //sever static content
  app.use(express.static(path.join(__dirname, "Frontend/build")));
}

// user
app.get("/api/u", userQuery.getUsers);
app.get("/api/user/:id", userQuery.selectUserById);
app.post("/api/user", userQuery.createUser);
app.post("/api/auth", userQuery.authUser);

//websites
app.post("/api/websites", webQuery.findWebsites);
app.post("/api/ratings", webQuery.getRatings);

//cookies
app.post("/api/cookies", cookieQuery.getCookies);

// catchall method
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend/build"));
});

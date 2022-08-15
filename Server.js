const express = require("express");
const cors = require("cors");
const path = require("path")
const userQuery = require("./Queries/userQueries");
const webQuery = require("./Queries/websiteQueries")
const cookieQuery = require("./Queries/cookieQueries")
const app = express(),
  bodyParser = require("body-parser");
const PORT = process.env.PORT || 3080;

//process.env.PORT
//process.env.NODE_ENV

// for an express app, the server is returned from the `.listen()` method
let server = app.listen();

server.on('clientError', (err, socket) => {
  console.error(err);
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});


app.use(bodyParser.json());
app.use(cors());


if(process.env.NODE_ENV === "production"){
  //sever static content
  app.use(express.static(path.join(__dirname, "Frontend/build")))
}


// user
app.get("/api/u", userQuery.getUsers);
app.get("/api/user/:id", userQuery.selectUserById);
app.post("/api/user", userQuery.createUser);
app.post("/api/auth", userQuery.authUser);

//websites
app.post("/api/websites", webQuery.findWebsites)
app.post("/api/ratings", webQuery.getRatings)

//cookies
app.post("/api/cookies", cookieQuery.getCookies)

// catchall method
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend/build"))
})





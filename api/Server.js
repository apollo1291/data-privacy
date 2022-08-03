const express = require("express");
const cors = require("cors");
const userQuery = require("./Queries/userQueries");
const webQuery = require("./Queries/websiteQueries")
const cookieQuery = require("./Queries/cookieQueries")
const app = express(),
  bodyParser = require("body-parser");
port = 3080;

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});


app.use(bodyParser.json());
app.use(cors());

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

count = 0;




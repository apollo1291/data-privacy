

const express = require('express');
const cors = require('cors');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

      app.listen(port, () => {
        console.log(`Server listening on the port::${port}`);
    });

const users = [{
    firstName: "first1",
    lastName: "last1",
    email: "abc@gmail.com"
  },
  {
    firstName: "first2",
    lastName: "last2",
    email: "abc@gmail.com"
  },
  {
    firstName: "first3",
    lastName: "last3",
    email: "abc@gmail.com"
  }] 

app.use(bodyParser.json())
app.use(cors());

app.get('/api/users', (req, res) => {
    console.log('app.get(api/users...) called')
    res.json(users)
    })



const express = require('express');
const cors = require('cors');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

      app.listen(port, () => {
        console.log(`Server listening on the port::${port}`);
    });

const users = [{
    username: 'pie',
    password: 'apple'
}] 

app.use(bodyParser.json())
app.use(cors());

app.get('/api/users', (req, res) => {
    console.log('app.get(api/users...) called')
    res.json(users)
    })

app.post('/api/user', (req, res) => {
    const user = req.body.user
    users.push(user)
    res.json("added")
})

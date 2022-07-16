
const validation = require('./BackendUsers')
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

const Websites = [
    { 
        url: "www.google.com",
        rating: 4

    },

    {
        url: 'www.mit.edu',
        rating: 5
    },
    {
        url: 'www.amazon.com',
        rating: 1
    },
    {
        url: 'www.mcdonalds.com',
        rating: 2
    },
    {
        url: 'www.yahoo.com',
        rating: 3.45
    },
    
    {
        url: 'www.bing.com',
        rating: -4.1
    }

]

app.use(bodyParser.json())
app.use(cors());

app.get('/api/users', (req, res) => {
    console.log('app.get(api/users...) called')
    res.json(users)
    })

app.post('/api/user', (req, res) => {
    const user = req.body.user
    console.log(user)
    if (validation.isValidEmail(user['email']) && validation.isValidPassword(user['password'])){
        users.push(user)
        console.log(users)
        res.json(true)

    }
    else{
        res.json(false)
    }
    
})

app.get('/api/websites', (req, res) => {
    console.log('app.get(api/websites...) called')

    res.json(Websites)
})

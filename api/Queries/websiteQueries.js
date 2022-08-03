require('dotenv').config()

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

// rename searchsites after replacing websitemanagment
const findWebsites = (req, res) => {
    
    const userSearch = req.body.search;
    pool.query('SELECT url, rating FROM websites where url LIKE $1', ['%' + userSearch + '%'], (err, result) => {
        if (err){
            throw err
        }
        console.log(result.rows)
        res.status(200).json(result.rows)
    })
}

const getRatings = (req, res) => {
    const url = req.body.url
    pool.query('SELECT rating, cookie_number_rating, cookie_security_rating, cookie_expires_rating FROM websites WHERE url = $1', [url], (err, result) =>{
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
}

module.exports ={
    findWebsites,
    getRatings
}
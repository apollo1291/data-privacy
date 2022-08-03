require('dotenv').config()

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});


const findWebsites = (req, res) => {
    /**
     * @desc: queries table 'websites' in datalink_api database for all websites that are similar to a users search
     * @param: res.body.search => the search the user entered
     * @return: returns an object containing all of the matches and there rating
     */
    const userSearch = req.body.search;
    pool.query('SELECT url, rating FROM websites where url LIKE $1', ['%' + userSearch + '%'], (err, result) => {
        if (err){
            throw err
        }
        
        res.status(200).json(result.rows)
    })
}

const getRatings = (req, res) => {
    /**
     * @desc: queries the 'websites' table in datalink_api for all of the ratings assosiated with a url
     * @param: req.body.url => the url to retrieve ratings from
     * @return: an object containing all of the ratings
     */
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
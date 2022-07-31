require('dotenv').config()

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

const getCookies = (req, res) => {
    const url = req.body.url

    pool.query("Select name, secure, expires, httpOnly from cookies where website_id = (Select id from websites where url = $1)", [url], (err, result) =>{
        if (err){
            throw err
        }
        res.status(200).json(result.rows)
    })
}

module.exports = {
    getCookies
 }
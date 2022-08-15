require('dotenv').config()
const Pool = require("pg").Pool;

const devConfig ={
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

const proConfig = {
    connectionString: process.env.DATABASE_URL, //heroku addons
    ssl: { rejectUnauthorized: false }
}
console.log('pool.js before error?')
const pool = new Pool(
    process.env.NODE_ENV === "production" ? proConfig : devConfig
);
console.log('pool.js after error')

module.exports = pool
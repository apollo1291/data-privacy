require("dotenv").config();
const Pool = require("pg").Pool;

//development database connection
const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

//production database coonection and configuration
const proConfig = {
  connectionString: process.env.DATABASE_URL, //heroku addons
  ssl: { rejectUnauthorized: false },
};

// create connection credentials to db
const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

module.exports = pool;

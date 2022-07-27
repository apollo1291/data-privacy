const validation = require('./userValidation')

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "datalink",
  host: "localhost",
  database: "datalink_api",
  password: "data",
  port: 5432,
});

const createUser = (req, res) => {
  const {username, email, password} = req.body.user
  const {isValidEmail, isValidPassword, isValidUsername} = validation

  if (isValidEmail(email) && isValidUsername(username) && isValidPassword(password) ){
    pool.query('INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *', [username, email], (error, results) => {
      if (error) {
        throw error
      }

      res.json(true)
    })
  } else{
    res.json(false)
  }
}
const getUsers = (req, res) => {
  /**
   * @desc: queries database and returns a object contains all users 
   */
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const authUser = (req, res) =>{
  const {username, password} = req.body.user

  pool.query("SELECT username, id FROM users WHERE username = $1 AND password = $2", [username, password], (error, results) => {
    if (error){
      throw error
    }
    console.log(results.rows)
    res.json(results.rows)
  })
}


// select a user from database
const selectUserById = (req, res) => {
  const { id } = req.params
  console.log(id)
  
  pool.query("SELECT * From users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }

    res.status(200).json(results.rows)
  })

}

// delete a user from database
const deleteUser = (req, res) => {

  const { id } = req.params
  pool.query("Delete * from users Where id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }

    res.status(200).send(`User deleted with ID: ${id}`)
  })

};

// update a user in the database 
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, email } = request.body

  pool.query(
    'UPDATE users SET username = $1, email = $2 WHERE id = $3',
    [username, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

module.exports = {
  createUser,
  getUsers,
  authUser,
  selectUserById,
  deleteUser,
  updateUser
};
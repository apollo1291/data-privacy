const validation = require('../userValidation')
const pool = require('../pool.js')

const createUser = (req, res) => {
  /**
   * @desc: creates a user in the datalink_api database in table 'users', checks for valid entries in the post request
   * @param: res.body.user => an object containing username, email and password
   * @return: a json object containing the created users username and id or false if the entries weren't valid
   */
  const {username, email, password} = req.body.user
  const {isValidEmail, isValidPassword, isValidUsername} = validation

  if (isValidEmail(email) && isValidUsername(username) && isValidPassword(password) ){
    pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING username, id', [username, email, password], (error, results) => {
      if (error) {
        throw error
      }

      res.json(results.rows)
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
  /**
   * @desc: authorizes a user by querying datalink_api using there username and password
   * @param: res.body.user => an object contains username and password
   * @return:if authorized, a json object with the users username and id, otherwise an empty array
   */
  const {username, password} = req.body.user

  pool.query("SELECT username, id FROM users WHERE username = $1 AND password = $2", [username, password], (error, results) => {
    if (error){
      throw error
    }
    
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
  /**
   * @desc: deletes a user from table users in datalink_api database
   * @param: res.params.id the id of the user to delete
   * @return: a confirmation that the user was deleted
   */

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
  /**
   * @desc: deletes a user from table users in datalink_api database
   * @param: res.params.id => the id of the user to delete
   * @param: res.body => an object containing the username and email
   * @return: a confirmation that the user was modified
   */

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
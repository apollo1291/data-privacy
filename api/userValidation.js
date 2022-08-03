
const isValidEmail = (email) => {
  /**
     * @desc: checks for a valid email
     * @param: email => the string to be checked
     * @return: boolean
     */
  return String(email)
    .toLowerCase()
    .match(/\S+@\S+\.\S+/);
}

const isValidPassword = (password) => {
  /**
     * @desc: checks for a valid password
     * @param: password => the string to be checked
     * @return: boolean
     */
  
  if (password.length < 5 || password.includes(' ')){
    return false
  } ;
  return true
}

const isValidUsername = (username) => {
  /**
     * @desc: checks for a vaild username
     * @param: username the string to be checked
     * @return: boolean
     */
  return !username.includes(' ') && username.length > 5 
}

module.exports = {isValidEmail, isValidPassword, isValidUsername}

const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/\S+@\S+\.\S+/);
}

const isValidPassword = (password) => {
  
  if (password.length < 5 || password.includes(' ')){
    return false
  } ;
  return true
}

const isValidUsername = (username) => {
  return !username.includes(' ') && username.length > 5 
}

module.exports = {isValidEmail, isValidPassword, isValidUsername}
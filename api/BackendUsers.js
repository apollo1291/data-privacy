
 module.exports = { 
    isValidEmail, isValidPassword
        
    }

 
function isValidEmail(email){
    return String(email).toLowerCase().match(
        /\S+@\S+\.\S+/
    );
}

function isValidPassword(password){
    return password.length > 5 
 }


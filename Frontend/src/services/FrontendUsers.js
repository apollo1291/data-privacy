
async function getAllUsers() {
    /**
     * @return: -> a promise, when fulfilled returns a list containing all user profiles
     */

    const response = await fetch('http://localhost:3080/api/users');
    return await response.json();
}

 export async function createUser(data){
    const response = await fetch('http://localhost:3080/api/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json()
}

export async function authUser(username, password) {
    /**
     * @param: username -> the username to check against the list of registered usernames
     * @param: password -> the password to verify that username
     * 
     * @return: boolean -> true if their exists a user with that username and password, false otherwise
     */
    
    const users = await getAllUsers()
    
    for(let i = 0; i < users.length; i++){
        if (users[i]['username'] === username && users[i]['password'] === password){
        
        return true
    }}
    return false
}
export function validateEmail(email){
    return String(email).toLowerCase().match(
        /\S+@\S+\.\S+/
    );
}









 export async function createUser(data){
    const response = await fetch('http://localhost:3080/api/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json()
}

export async function authUser(data) {
    /**
     * @param: username -> the username to check against the list of registered usernames
     * @param: password -> the password to verify that username
     * 
     * @return: boolean -> true if their exists a user with that username and password, false otherwise
     */
    
    const response = await fetch("http://localhost:3080/api/auth", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
    })

    const user = await response.json()

    return user.length !== 0
    
}
export function validateEmail(email){
    return String(email).toLowerCase().match(
        /\S+@\S+\.\S+/
    );
}







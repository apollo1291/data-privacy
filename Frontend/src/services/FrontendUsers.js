

 export async function createUser(data){
    /**
     * @desc: creates a user in the database. 
     * @param: data => the user data in form. {email: "", username: "", password: ""}
     * @return: response => the reponse from the server, either username and id indicating succsess,
     * or false indicating failure
     */
    const response = await fetch('/api/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json()
}

export async function authUser(data) {
    /**
     * @desc: authorizes a user
     * @param: username -> the username to check against the list of registered usernames
     * @param: password -> the password to verify that username
     * 
     * @return: user -> if successful an object with the username and id, an empty array otherwise
     */
    
    const response = await fetch("/auth", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
    })

    const user = await response.json()

    return user
    
}
export function validateEmail(email){
    /**
     * @desc: validates email using regex pattern
     * @param: the email to validate
     * @return: boolean
     */
    return String(email).toLowerCase().match(
        /\S+@\S+\.\S+/
    );
}







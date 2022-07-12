
export async function getAllUsers() {

    const response = await fetch('http://localhost:3080/api/users');
    console.log(response)
    return await response.json();
}

export async function createUser(data){
    const reponse = await fetch('http://localhost:3080/api/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
}

export async function authUser(username, password) {
    const users = await getAllUsers()
    console.log(users)
    
    for(let i = 0; i < users.length; i++){
        if (users[i]['username'] === username && users[i]['password'] === password){
        
        return true
    }}
    return false
}



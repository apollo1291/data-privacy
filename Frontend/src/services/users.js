
export async function getAllUsers() {

    const response = await fetch('http://localhost:3080/api/users');
    console.log(response)
    return await response.json();
}
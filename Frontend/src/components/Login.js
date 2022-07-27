import { useState } from 'react';
import { authUser, createUser, validateEmail} from '../services/FrontendUsers';
import './Login.css'

export function LoginPage(props){
    const [user, setUser] = useState({
        username: null,
        password: null
    })
    const [Page, setPage] = useState({
        Login: true
    })

    const swapPage = () => {
        /**
         * swaps the component between sign up and login pages
         * 
         * @param: nothing
         * @return: nothing 
         */
        const defaultSetting = {
            username: null,
            password: null}
        const currentPage = Page.Login
        setPage({Login: !currentPage})
        setUser(defaultSetting)
    }
    const handleLoginChange = (event) => {
        /**
         * sets the state of the login page to the values the user entered
         * @param: event -> user typing on the keyboard
         * @return: nothing 
         */
        if (event.target.id === 'userlogin'){
         setUser({...user, username: event.target.value.trim() } )
        }
        else if(event.target.id === 'passlogin'){
         setUser({...user, password: event.target.value.trim()})}
         

    }
    const handleLoginSubmit = async () => {
        /**
         * checks if the user entered username and password is valid,
         * if valid it logs into the app, if not it alerts the user
         * 
         * @return: nothing  
         */
        console.log(user)
        const auth = await authUser(user)
        
        if(auth){
        
        props.setAppState({...props.appState, user: user.username})
    }
    else{
        alert("invalid username or password")
    }

        
    }

    const handleSignUpChange = (event) => {
        /**
         * changes the state of the login info to
         * match the users inputs 
         * 
         * @param: events, typing, deleting etc. 
         */

        if(event.target.id === 'setEmail'){
            setUser({...user, email: event.target.value.trim() } )
        }

        if (event.target.id === 'setUser'){
            setUser({...user, username: event.target.value.trim() } )
           }

        if(event.target.id === 'setPass'){
            setUser({...user, password: event.target.value.trim() })}
        
    }

    const handleSignUp = async () => {
        /**
         * checks for valid email, then sends a post req 
         * to create the user in the backend
         */
        if (!validateEmail(user.email)){
            alert('invalid sign up: check if email and password are valid')
            return
        }

        const registrationWorked = await createUser(user)

        if(!registrationWorked){
            alert('There was a false return from our servers. Please check if your email and password are valid')
            return
        }

        props.setAppState({...props.appState, user: user.username})
        


    }
    if (Page.Login){
    return(
        <>
        
        <div className='page'>
        <div id='form'>
        <h1><img src={require("../databaseWhite.png") } alt=''></img>Datalink</h1>
        <div className='label'>
            <label>Username:</label>
            </div>
            <div className='loginField'>
                <input id='userlogin' type='text' placeholder='Enter username' onChange={event => handleLoginChange(event)}></input>
            </div>
        
            <div className='label'>
                <label>Password:</label>
            </div>
            <div className='loginField'>
                <input id='passlogin' type='text' placeholder='Enter password' onChange={event => handleLoginChange(event)}></input>
            </div>
        
            <button onClick={() => handleLoginSubmit()}> Login </button>
            <div id='switch'>
                <p>Not a registered user, yet?</p>
                <p id='signup'onClick={() => swapPage()}> Sign Up </p>
            </div>
        
        </div>
        </div>

        
        </>
        
        
    )}
    if (!Page.Login){
        return(
            <>
        <div className='page'>
        <div id='form'>
            <h1><img src={require("../databaseWhite.png") } alt=''></img>Datalink</h1>
            <div className='label'>
                <label>Set Email:</label>
            </div>
            <div className='loginField'>
                <input id='setEmail' type='text' placeholder='abc@gmail.com' onChange={event => handleSignUpChange(event)}></input>
            </div>
        <div className='label'>
            <label>Set Username:</label>
            </div>
            <div className='loginField'>
                <input id='setUser' type='text' placeholder='Person123' onChange={event => handleSignUpChange(event)}></input>
            </div>
        
            <div className='label'>
                <label>Password:</label>
            </div>
            <div className='loginField'>
                <input id='setPass' type='text' placeholder='Enter password' onChange={event => handleSignUpChange(event)}></input>
            </div>
        
            <button onClick={() => handleSignUp()}> Sign Up </button>
            <div id='switch'>
                <p>Already registered?</p>
                <p id='signup'onClick={() => swapPage()}> Login </p>
            </div>
        
        </div>
        </div>

        
        </>
        )
    }
}
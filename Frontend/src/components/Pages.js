import { useEffect, useState } from 'react';
import { authUser, createUser, validateEmail} from '../services/FrontendUsers';
import './Pages.css';
import database from '../database.svg'
import logo from '../logo.svg';

/* 
 *  Contains the different component webpages 
    for the main part of the app, 
    including the Home, About, etc. 
 
 *  exports Pages, a dictionary of webpage components,
 *  to MainPages
*/

const Pages = {
    "Home": <Home />,
    
    "About": <About />
}


function Home() {
    const [state, setState] = useState({
        userSearch: null
    })

    const handleChange = (event) => {
        /**
         * @params event -> an html event in the search bar, typing deleting etc
         * @returns nothing -> sets the state of the component to the search
         */
        setState({userSearch: event.target.value})
    }

    return(
        <>
        <div id="frontpage" className="center-active">
        <input type="text" placeholder="Enter Url" id="inp" onChange={event => handleChange(event)}></input><br></br>
        <button type="button" id="btn"> Search </button>
        </div>
        <HomeSearchResults userSearch= {state.userSearch} />
        </>
        


    )
}

function HomeSearchResults(props) {
    const [state, setState] = useState({
        results: null
    })
    

    useEffect(() => {
        const SearchForSite = async (userSearch) =>{
            /**
             * Finds urls that the user could be searching for
             * 
             * @param: Url -> input from the user searching for a website
             * @param: websiteList -> List of websites and corresponding data
             * @return: mathes -> any websites that match the users search 
             */
    
            // request the website data from the backend
            const websites = await fetch('http://localhost:3080/api/websites')
            const websiteList = await websites.json()
    
            // variable to hold any mathes
            let matches = [] 
    
            
            
            // check each websites url and compare to input
            websiteList.forEach(element=> { 
    
                if (element['url'].includes(userSearch)){
                    matches.push(element)
                }
            });
            setState({results: matches})
    
        }
        SearchForSite(props.userSearch)
            }, [props.userSearch])

    
    const showSearch = (matches) => {
        /**
         * Displays any matches to user search
         * 
         * 
         * @return: html 
         */
        
            return(
                <div className='searchResults'>
                    {matches.map(site =>(
                        <div className='sitebox' key={site.url}>
                            <p className='holdsUrl'>{site.url}</p>
                            <p className='holdsRating'>{site.rating}</p>
                        </div>
                    ))}
                </div>
            )
        }
        
    

    if (state.results === null){
        return
    }

    return(
        showSearch(state.results)
    )


}

function About() {

    return (
        <div class="About"> About </div>
    )
}

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
         setUser({...user, username: event.target.value } )
        }
        else if(event.target.id === 'passlogin'){
         setUser({...user, password: event.target.value})}
         

    }
    const handleLoginSubmit = async () => {
        /**
         * checks if the user entered username and password is valid,
         * if valid it logs into the app, if not it alerts the user
         * 
         * @return: nothing  
         */
        const auth = await authUser(user.username, user.password)
        if(auth){
        
        props.setAppState({...props.appState, user: user.username})
    }
    else{
        alert("invalid username or password")
    }

        
    }

    const handleSignUpChange = (event) => {

        if(event.target.id === 'setEmail'){
            setUser({...user, email: event.target.value } )
        }

        if (event.target.id === 'setUser'){
            setUser({...user, username: event.target.value } )
           }

        if(event.target.id === 'setPass'){
            setUser({...user, password: event.target.value})}
        
    }

    const handleSignUp = async () => {
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
        <h1>Datalink</h1>
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
            <h1>Datalink</h1>
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


export default Pages
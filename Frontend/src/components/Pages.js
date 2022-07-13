import { Component, useEffect, useState } from 'react';
import { authUser } from '../services/users';
import './Pages.css';

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

const Websites = [
    { 
        url: "www.google.com",
        rating: 4

    },

    {
        url: 'www.mit.edu',
        rating: 5
    },
    {
        url: 'www.amazon.com',
        rating: 1
    },
    {
        url: 'www.mcdonalds.com',
        rating: 2
    },
    {
        url: 'www.yahoo.com',
        rating: 3.45
    },
    
    {
        url: 'www.bing.com',
        rating: -4.1
    }

]

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
        <div id="frontpage" class="center-active">
        <input type="text" placeholder="Enter Url" id="inp" onChange={event => handleChange(event)}></input><br></br>
        <button type="button" id="btn"> Search </button>
        </div>
        <HomeSearchResults userSearch= {state.userSearch} />
        </>
        


    )
}

function HomeSearchResults(props) {
    const [state, setSearch] = useState({
        Search: props.userSearch
    })

    useEffect(() => {
        /**
         * @param: nothing
         * @return: nothing -> sets state to what the user is searching for 
         */
        // when the search bar is empty set Search state to null
        // because '' will return a match to every string
        if (props.userSearch === ''){
            setSearch({Search: null})
            return
        }
        // set the 
        setSearch({Search: props.userSearch})}, [props.userSearch])

    const SearchForSite = (userSearch, websiteList) =>{
        /**
         * Finds urls that the user could be searching for
         * 
         * @param: Url -> input from the user searching for a website
         * @param: websiteList -> List of websites and corresponding data
         * @return: mathes -> any websites that match the users search 
         */

        // variable to hold any mathes
        let matches = [] 
        
        // check each websites url and compare to input
        websiteList.forEach(element=> { 

            if (element['url'].includes(userSearch)){
                matches.push(element)
            }
        });
        return matches 

    }
    const showSearch = (State) => {
        /**
         * Displays any matches to user search
         * 
         * @param: State -> the value of the search bar 
         * @return: html 
         */
        
        // Get all of the urls that match the users search
        let matches = SearchForSite(state['Search'], Websites)
        
        if (matches === []){
            return 
        }

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

    

    return(
        showSearch()
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
    const handleChange = (event) => {
        /**
         * @param: event -> user typing on the keyboard
         * @return: nothing -> sets the state of the login page to the current login values 
         */
        if (event.target.id === 'userlogin'){
         setUser({...user, username: event.target.value } )
        }
        else if(event.target.id === 'passlogin'){
         setUser({...user, password: event.target.value})}
         

    }
    const handleSubmit = async () => {
        /**
         * @return: nothing -> checks if the user entered username and password is valid,
         *  if valid it logs into the app, if not it alerts the user 
         */
        const auth = await authUser(user.username, user.password)
        if(auth){
        
        props.setAppState({...props.appState, user: user.username})
    }
    else{
        alert("invalid username or password")
    }

        
    }
    return(
        <>
        <label>Username:
        <input id='userlogin' type='text' placeholder='Enter email' onChange={event => handleChange(event)}></input>
        </label>
        <label>Password:
        <input id='passlogin' type='text' placeholder='Enter password' onChange={event => handleChange(event)}></input>
        </label>
        <button onClick={() => handleSubmit()}/>
        
        </>
        
        
    )
}

export default Pages
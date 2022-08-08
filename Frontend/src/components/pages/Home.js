import { useState } from 'react';
import { HomeSearchResults } from "./HomeSearchResults";
import './Home.css'

export const Home = (props) => {
    /**
     * renders the home page
     */
    const [state, setState] = useState({
        userSearch: null
    });

    const handleChange = (event) => {
        /**
         * @params event -> an html event in the search bar, typing deleting etc
         * @returns nothing -> sets the state of the component to the search
         */
        setState({ userSearch: event.target.value });
    };

    return (
        <>
            
            <div id="frontpage" className="center-active">
                <input type="text" placeholder="Test a website for cookies" id="inp" onChange={event => handleChange(event)}></input><br></br>
                
            </div>
            <HomeSearchResults userSearch={state.userSearch} appState={props.appState} setAppState={props.setAppState} />

            <div className='info-container'>
            <div className='info'>
                <div className='header'>
                    <h1>
                        What are Cookies?
                    </h1>
                </div>
                <div className='info-text'>
                    <p>
                    A Cookie is a small data file created by a web server 
                    and stored on a users device. They are used to track information 
                    like preferences, logins, and browsing history. Cookies are essential
                    for a quality user experience on the web and allow for features like 
                    backtracking, automatic logins, and dark-mode. Cookies are not inherently
                    bad. However, when used excessively or incorrectly they introduce vulnerabilities
                    that can expose user data, or even take users data without permission.
                    </p>
                </div>
            </div>
            </div>

        </>



    );
};

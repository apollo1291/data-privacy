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
                <input type="text" placeholder="Enter Url" id="inp" onChange={event => handleChange(event)}></input><br></br>
                <button type="button" id="btn"> Search </button>
            </div>
            <HomeSearchResults userSearch={state.userSearch} appState={props.appState} setAppState={props.setAppState} />
        </>



    );
};

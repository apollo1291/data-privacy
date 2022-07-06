import { useState } from 'react';
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

function Home() {
    const [state, setState] = useState({Search: null})

    const handleChange = (event) => {
        /**
         * @params event -> { an html event in the search bar, 
         * typing deleting etc }
         * @returns nothing -> { but alters homes jsx return value
         *  to reflect what matches the search }  
         */
        console.log("search bar says:", event.target.value)

        setState({Search: event.target.value})
        SearchForSite(state.Search)
    }
    const SearchForSite = (Url) =>{
        /**
         * 
         */
    }

    return(
       <>
       <div id="frontpage" class="center-active">
       <input type="text" placeholder="Enter Url" id="inp" onChange={event => handleChange(event)}></input><br></br>
       <button type="button" id="btn"> Search </button>
       </div>
       </>  
    )
}

function About() {

    return (
        <div class="About"> About </div>
    )
}

export default Pages
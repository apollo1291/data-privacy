import { useEffect, useState } from 'react';
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
             * changing this to not do the work on the front end
             * 
             * Finds urls that the user could be searching for
             * 
             * @param: Url -> input from the user searching for a website
             * @param: websiteList -> List of websites and corresponding data
             * @return: mathes -> any websites that match the users search 
             */

            // request the website data from the backend
            const matches = await fetch('http://localhost:3080/api/websites', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({search: userSearch})
            });
            setState({results: await matches.json()})
    
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



export default Pages
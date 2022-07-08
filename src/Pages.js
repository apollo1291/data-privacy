import { Component, useEffect, useState } from 'react';
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
        url: "google.com",
        rating: 4

    },

    {
        url: 'www.mit.edu',
        rating: 5
    },
    {
        url: 'amazon.com',
        rating: 1
    }

]

function Home() {
    const [state, setState] = useState({
        userSearch: null
    })

    const handleChange = (event) => {
        /**
         * @params event -> an html event in the search bar, typing deleting etc
         * @returns nothing -> but alters homes jsx return value to reflect what matches the search
         */
        console.log("search bar says:", event.target.value)


        // updates correctly 
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

function HomeSearchResults(userSearch) {
    const [state, setSearch] = useState({
        Search: userSearch.userSearch
    })

    useEffect(() => {
        if (userSearch.userSearch === ''){
            setSearch({Search: null})
            return
        }
        
        setSearch({Search: userSearch.userSearch})}, [userSearch.userSearch])

    const SearchForSite = (userSearch, websiteList) =>{
        /**
         * @param: Url -> input from the user searching for a website
         * @param: websiteList -> List of websites and corresponding data
         * @return: mathes -> any websites that match the users search 
         */

        // variable to hold any mathes
        let matches = [] 
        
        // check each websites url and compare to input
        websiteList.forEach(element=> { 

            if (element['url'].indexOf(userSearch) !== -1){
                matches.push(element)
            }
        });
        console.log(matches[0])
        return matches 

    }
    const showSearch = (State) => {

        
        let matches = SearchForSite(state['Search'], Websites)
        
        if (matches === []){
            return 
        }
        // isn't displaying the return div. dont know why
        return(
            <div>
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

export default Pages
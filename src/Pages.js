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
        Search: null,
        SearhMatches: []
    })

    const handleChange = (event) => {
        /**
         * @params event -> an html event in the search bar, typing deleting etc
         * @returns nothing -> but alters homes jsx return value to reflect what matches the search
         */
        console.log("search bar says:", event.target.value)


        let matchingSites = SearchForSite(event.target.value, Websites)
        // updates correctly 
        setState({Search: event.target.value, 
            SearhMatches: matchingSites})
    }

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

            /* Type errors here. userSearch and element['url'] are both 
                strings. I know because of the print statements above
            
            */
            if (element['url'].includes(userSearch)){
                matches.push(element)
            }
        });
        console.log(matches[0])
        return matches 

    }
    const showSearch = (State) => {
        
        if (State.SearhMatches = []){
            return 
        }
        // isn't displaying the return div. dont know why
        return(
            <div>
                {State.SearhMatches.map(site =>(
                    <div className='sitebox'>
                        <p className='holdsUrl'>{site.url}</p>
                        <p className='holdsRating'>{site.rating}</p>
                    </div>
                ))}
            </div>
        )
    }

    return(
       <>
       <div id="frontpage" class="center-active">
       <input type="text" placeholder="Enter Url" id="inp" onChange={event => handleChange(event)}></input><br></br>
       <button type="button" id="btn"> Search </button>
       </div>
       { showSearch({state}) }
       </>
         
    )
}

function About() {

    return (
        <div class="About"> About </div>
    )
}

export default Pages
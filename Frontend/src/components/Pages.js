import { useEffect, useState } from 'react';
import './Pages.css';




/* 
 *  Contains the different component webpages 
    for the main part of the app, 
    including the Home, About, etc. 
 
 *  exports Pages, a dictionary of webpage components,
 *  to MainPages
*/




const Home = (props) => {
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
        <HomeSearchResults userSearch= {state.userSearch} appState = { props.appState } setAppState = { props.setAppState }/>
        </>
        


    )
}

const HomeSearchResults = (props) => {
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
            // avoid false calls to server
            if (userSearch === ''){
                setState({results: null})
                return
            }
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

    const displayCookiePage = (url) => {
        props.setAppState({...props.appState, Page: 'cookie', url: url})
    }
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
                        <div className='sitebox' key={site.url} onClick={() => displayCookiePage(site.url)}>
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

const About = () => {

    return (
        <div class="About"> About </div>
    )
}

const CookieReport = (props) => {
    const [cookieData, setCookies] = useState({

    })
    const [cookieRatings, setRatings] = useState({

    })
    useEffect(() => {
    const fetchCookies = async (url) => {
        console.log("runs")
        const cookieResponse = await fetch("http://localhost:3080/api/cookies", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({url: url})
        })
        const ratingsResponse = await fetch("http://localhost:3080/api/ratings", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({url: url})
        })

        const cookies = await cookieResponse.json()
        const ratings = await ratingsResponse.json()
        console.log(cookies)
        
        setCookies({
            cookies: cookies
        })

        setRatings({
            ratings: ratings
        })

    }
    fetchCookies(props.url)},  [props.url])

    const showCookies= () => {
        return(
        
        <>
        <div>
            {cookieRatings.ratings?.map(rating => (
                <div key='ratings'>
                    <p>{rating.cookie_number_rating}</p>
                    <p>{rating.cookie_security_rating}</p>
                    <p>{rating.cookie_expires_rating}</p>
                </div>

            ))}
        </div>
        <table id='cookies'>
                <tbody>
                    {cookieData.cookies?.map(cookie => (
                        <tr key={cookie.name}>
                            <td>{cookie.name}</td>
                            <td key={cookie.name + ' secure'}>{String(cookie.secure)}</td>
                            <td key={cookie.name + ' httponly'}>{String(cookie.httponly)}</td>
                            <td key={cookie.name + ' expires'}>{cookie.expires}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
        )
    }
    return(
        showCookies()
    )
}

export {About, Home, CookieReport}


import { useEffect, useState } from 'react';
import './HomeSearchResults.css'





export const HomeSearchResults = (props) => {
    /**
     * renders the seach results from the home page
     */
    const [state, setState] = useState({
        results: null
    });


    useEffect(() => {
        const SearchForSite = async (userSearch) => {
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
            if (userSearch === '') {
                setState({ results: null });
                return;
            }
            // request the website data from the backend
            const matches = await fetch('http://localhost:3080/api/websites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ search: userSearch })
            });
            setState({ results: await matches.json() });

        };
        SearchForSite(props.userSearch);
    }, [props.userSearch]);

    const displayCookiePage = (url) => {
        /**
         * @desc: sets the apps state so flow control can display the cookie report 
         * for a given website
         * @param: url -> the url the user selected
         * @return: nothing
         */
        props.setAppState({ ...props.appState, Page: 'cookie', url: url });
    };
    const showSearch = (matches) => {
        /**
         * Displays any matches to user search
         *
         *
         * @return: html
         */
        return (
            <div className='searchResults'>
                {matches.map(site => (
                    <div className='sitebox' key={site.url} onClick={() => displayCookiePage(site.url)}>
                        <p className='holdsUrl'>{site.url}</p>
                        <p className='holdsRating'>{site.rating} / 100</p>
                    </div>
                ))}
            </div>
        );
    };



    if (state.results === null) {
        return;
    }

    return (
        showSearch(state.results)
    );


};

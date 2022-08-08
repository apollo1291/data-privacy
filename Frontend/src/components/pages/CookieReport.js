import { useEffect, useState } from 'react';
import {fetchCookies, fetchRatings, getColor, getWidth} from '../../services/FrontendCookies.js'
import './cookieReport.css'

export const CookieReport = (props) => {
    const [isLoading, setLoading] = useState(true)
    const [cookieData, setCookies] = useState({});
    const [cookieRatings, setRatings] = useState({});
    useEffect(() => {
        const getData = async () =>{
        setCookies({cookies: await fetchCookies(props.url)});
        setRatings({ratings: await fetchRatings(props.url)})
        setLoading(false)
    }

    getData()
        
    }, [props.url]);

    const goBack = () => {
        props.setAppState({...props.appState, Page: "Home", url: null})
    }
    const showCookies = () => {
        if (isLoading){
            return(
                <div></div>
            )
        }
        
        return (

            <>
                    
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <div id='back-button'>
                    <span class='dot' onClick={() => goBack()}>
                        <i class="fa fa-angle-left" style={{'fontSize': '24px'}}></i>
                    </span>
                    </div>                    
                    <div class='url'>
                        <h1>{props.url}</h1>
                    </div>
                    <div id='ratings-container'>
                    {cookieRatings.ratings?.map(rating => (
                        <div id ='ratings' key='ratings'>
                            <div class='r'>
                            <h2>Number of Cookies Rating</h2>
                            <h2>{rating.cookie_number_rating} / 33</h2>
                            
                            <div class = 'bar-container'> 
                            <div class='bar' style={{'--color': getColor(rating.cookie_number_rating), '--width': getWidth(rating.cookie_number_rating)}}></div>
                            </div>
                            </div>

                            <div class='r'>
                            <h2> Cookie Security Rating</h2>
                            <h2>{rating.cookie_security_rating} / 33</h2>
                            
                            <div class = 'bar-container'> 
                            <div class='bar' style={{'--color': getColor(rating.cookie_security_rating), '--width': getWidth(rating.cookie_security_rating)}}></div>
                            </div>
                            </div>

                            <div class='r'>
                            <h2>Expiration Date Rating</h2>
                            <h2>{rating.cookie_expires_rating} / 33</h2>
                            
                            <div class = 'bar-container'> 
                            <div class='bar' style={{'--color': getColor(rating.cookie_expires_rating), '--width': getWidth(rating.cookie_expires_rating)}}></div>
                            </div>
                            </div>
                        </div>

                    ))}
                    </div>
                
                <div id='scan-results'>
                <div id='table-container'>
                <table id='cookies'>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Secure</th>
                        <th>HTTP Only</th>
                        <th>Expiration Date</th>
                    </tr>
                    </thead>
                    
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
                </div>
                </div>
            </>
        );
    };
    return (
        showCookies()
    );
};

import { useEffect, useState } from 'react';
import {fetchCookies, fetchRatings} from '../../services/FrontendCookies.js'

export const CookieReport = (props) => {
    const [cookieData, setCookies] = useState({});
    const [cookieRatings, setRatings] = useState({});
    useEffect(() => {
        const getData = async () =>{
        setCookies({cookies: await fetchCookies(props.url)});
        setRatings({ratings: await fetchRatings(props.url)})
    }

    getData()
        
    }, [props.url]);

    const showCookies = () => {
        
        return (

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
        );
    };
    return (
        showCookies()
    );
};

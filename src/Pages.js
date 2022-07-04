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
    return(
        <div class="urlsearch"> <p> Home </p></div> 
    )
}

function About() {

    return (
        <div class="About"> About </div>
    )
}

export default Pages
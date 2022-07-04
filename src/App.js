import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { useState } from 'react';
import MainPage from './MainPage';


function MenuOption(props){

  const handleClick = () => {
    /*
     * Takes no arguments
     * no return value
     * Changes the Page state of the App webpage
    
    */
    props.changePage({Page: props.name})

  }

  return(
    <li><button className="navButton" onClick={handleClick}>
        
        { props.name }
      </button></li>
    )
  
}
function TopNav(props){

    
  
    return(
      <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div class="topnav">
  
        <div class="nav">
          <p id="name"> Data-Link</p>
          <ul>
            <MenuOption name = {"Home"} changePage={props.changePage}/>
            <MenuOption name = {"About"} changePage={props.changePage}/>
          </ul>
          
        </div>
  
      </div>
      </>
    )

  
}

function App(){

  const [state, setState] = useState({Page: "Home"})
  
  
    return (
    <div className="App">
    <TopNav changePage = { setState }/>
    <MainPage Page = {state.Page}/>
    </div>
      
  )

}

export default App;
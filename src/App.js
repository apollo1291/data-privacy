import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { useState } from 'react';

function MenuOption(props){
  return(
    <li><button className="navButton" onClick={props.onClick}>
        
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
            <MenuOption name = {"Home"} onClick={props.onClick}/>
            <MenuOption name = {"About"} onClick={props.onClick}/>
          </ul>
          
        </div>
  
      </div>
      </>
    )

  
}
function MainPage(props){
  

  const renderState = () => {
    /* 
      input: nothing
      return: html section of webpage

      decides which webpage to return based on the Page passed from App's state
    */
    if (props.Page === "Home"){
      return(
        <div class="urlsearch"> <p>hello</p></div>
      ) 
      }
    if (props.Page === "About"){
      return(
        <div class="About"> hiiii </div>
      )
    } 
  }

  
    return(
      renderState()
    )
  }

function App(){

  const [state, setState] = useState({Page: "Home"})
  
  const handleClick = () => {
    /* input: nothing
       return: nothing

       changes the state of App 
    */ 
    setState({Page: "About"})
  }
  
  
    return (
    <div className="App">
    <TopNav onClick={ handleClick }/>
    <MainPage Page = {state.Page}/>
    </div>
      
  )

}

export default App;
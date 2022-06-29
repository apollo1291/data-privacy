import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { useState } from 'react';

function MenuOption(props){
  return(
    <li><button className="navButton" OnClick={props.OnClick}>
        
        { props.name }
      </button></li>
    )
  
}
class TopNav extends Component {

  renderNav(name){
    return(
      <MenuOption name = { name } OnClick = {this.props.onClick} />
    )
      
  }
  render(){
    return(
      <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div class="topnav">
  
        <div class="nav">
          <p id="name"> Data-Link</p>
          <ul>
            {this.renderNav("Home")}
            {this.renderNav("About")}
          </ul>
          
        </div>
  
      </div>
      </>
    )
  }
  
}
class MainPage extends Component{
  

  renderState(){
    /* 
      input: nothing
      return: html section of webpage

      decides which webpage to return based on the Page passed from App's state
    */
    if (this.props.Page === "Home"){
      return(
        <div class="urlsearch"> <p>hello</p></div>
      ) 
      }
    if (this.props.Page === "About"){
      return(
        <div class="About"> hiiii </div>
      )
    } 
  }

  render(){
    return(
      this.renderState()
    )
  }
}
class App extends Component{

  state = {Page: "Home"}
  
  handleClick = () => {
    /* input: nothing
       return: nothing

       changes the state of App 
    */ 
    this.setState({Page: "About"})
  } 
  
  render(){
    return (
    <div className="App">
    <TopNav setValue = {() => this.handleClick} />
    <MainPage Page = {this.state.Page}/>
    </div>
    
    
  );}

}

export default App;


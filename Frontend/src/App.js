import logo from './logo.svg';
import { Component, useEffect } from 'react';
import { useState } from 'react';
import { MainPage } from './components/MainPage';
import { TopNav } from './components/TopNav';
import { getAllUsers } from './services/users';
import { LoginPage } from './components/Pages'


function App(){

  const [state, setState] = useState({Page: "Home",
user: null})
  
    
    if (state.user){
      return (
      <div className="App">
      <TopNav changePage = { setState }/>
      <MainPage Page = {state.Page}/>
      </div>
        
    )}
    
    return(
      <LoginPage appState = { state } setAppState = { setState }/>
    )

}

export default App;
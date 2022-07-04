import logo from './logo.svg';
import { Component } from 'react';
import { useState } from 'react';
import { MainPage } from './MainPage';
import { TopNav } from './TopNav';


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
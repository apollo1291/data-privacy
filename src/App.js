import logo from './logo.svg';
import { Component } from 'react';
import { useState } from 'react';
import { MainPage } from './components/MainPage';
import { TopNav } from './components/TopNav';


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
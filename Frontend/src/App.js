import logo from './logo.svg';
import { Component, useEffect } from 'react';
import { useState } from 'react';
import { MainPage } from './components/MainPage';
import { TopNav } from './components/TopNav';
import { getAllUsers } from './services/users';


function App(){

  const [state, setState] = useState({Page: "Home"})
  useEffect(() => {
    getAllUsers().then(users => {console.log(users)}
    )})
  
    

    return (
    <div className="App">
    <TopNav changePage = { setState }/>
    <MainPage Page = {state.Page}/>
    </div>
      
  )

}

export default App;
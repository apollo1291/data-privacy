
import { useState } from 'react';
import { MainPage } from './components/MainPage';
import { TopNav } from './components/TopNav';
import { LoginPage } from './components/Login'


function App(){

  const [state, setState] = useState({Page: "Home",
user: null})
  
    
    if (state.user){
      return (
      <div className="App">
      <TopNav appState = { state } changePage = { setState }/>
      <MainPage Page = {state.Page}/>
      </div>
        
    )}
    
    return(
      <LoginPage appState = { state } setAppState = { setState }/>
    )

}

export default App;
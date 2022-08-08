
import { useState } from 'react';
import { MainPage } from './components/MainPage';
import { LoginPage } from './components/pages/Login'


function App(){

  const [user, setUser] = useState({
  user: window.sessionStorage.getItem("user"),
})
  const [state, setState] = useState({
    Page: "Home",
    url: null
  })
  
    if (user.user){
      return (
      <div className="App">
      
      <MainPage appState = { state } setAppState = { setState }/>
      </div>
        
    )}
    
    return(
      <LoginPage appState = { user } setAppState = { setUser }/>
    )

}

export default App;

import { useState } from 'react';
import { MainPage } from './components/MainPage';
import { TopNav } from './components/TopNav';
import { LoginPage } from './components/Login'


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
      <TopNav appState = { state } changePage = { setState }/>
      <MainPage appState = { state } setAppState = { setState }/>
      </div>
        
    )}
    
    return(
      <LoginPage appState = { user } setAppState = { setUser }/>
    )

}

export default App;

import { useEffect, useState } from 'react';
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
  useEffect(() => { 
    const setHome = async () => {
      if (user.user){
        setState({
        Page: "Home",
        url: null
      })
      }
    };
    setHome();
}, [user]);
    
   return (
    <div className="App">
    
    <MainPage user = { user } setUser ={ setUser } appState = { state } setAppState = { setState }/>
    </div>
    )

}

export default App;
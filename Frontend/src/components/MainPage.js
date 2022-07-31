import {Home, About, CookieReport} from './Pages'

/**
 * Contains component to control 
 * the display of the main page of the app
 */

export function MainPage(props){

    const Pages ={
      'Home': <Home appState = { props.appstate } setAppState = { props.setAppState } />,
      'About': <About />,
      'cookieReport': <CookieReport url = { props.appState.url }/>
    }
  
    const renderState = () => {
      /**
       * Displays the correct webpage corresponding to the Apps current state.
       * props.Page is the page the App wants to display. 
       * Looks for the corresponding page in variable pages
       * @param: { None }
       * @return: { html webpage } 
       * 
       * **/
      if (!props.appState.url){
        return Pages[props.appState.Page]
      }

      return Pages['cookieReport']


    }
  
    
      return(
        renderState()
      )
    }


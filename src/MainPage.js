import Pages from './Pages'

/**
 * Contains component to control 
 * the display of the main page of the app
 */

export function MainPage(props){
  
    const renderState = () => {
      /**
       * Displays the correct webpage corresponding to the Apps current state.
       * props.Page is the page the App wants to display. 
       * Looks for the corresponding page in variable pages
       * @param: { None }
       * @return: { html webpage } 
       * 
       * **/

      return Pages[props.Page]
    }
  
    
      return(
        renderState()
      )
    }


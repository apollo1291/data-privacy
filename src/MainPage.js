import Pages from './Pages'

/**
 * Contains 
 */

function MainPage(props){
  
    const renderState = () => {
      /**
       * Displays the correct webpage corresponding to the Apps current state.
       * props.Page is the state. Looks for the corresponding page in pages
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

export default MainPage;
import './TopNav.css';
/** 
 * Contains the Top Navigation 
 * exports the Top Navigation 
 */

export function TopNav(props) {
  /**
   * renders the Top Navigation Bar
   */


  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div className='topnav'>

        <div className='nav'>
          <p id="name"><img src={require("../databaseWhite.png") } alt=''></img>Data-Link</p>
          <ul>
            <MenuOption name={"Home"} appState = { props.appState } changePage={props.changePage} />
            <MenuOption name={"About"} appState = { props.appState } changePage={props.changePage} />
  
          </ul>

        </div>

      </div>
    </>
  );


}
function MenuOption(props) {
  /**
   * renders the Menu Page Buttons 
   * within the Top Navigation 
   */

  const handleClick = () => {
    /***
     * Changes the state of App 
     * corresponding to the Menu Option thats clicked
     * 
     * @param: { none }
     * @return: { none }
    */
    props.changePage({...props.appState, Page: props.name });

  };

  return (
    <li><button className="navButton" onClick={handleClick}>

      {props.name}
    </button></li>
  );

}

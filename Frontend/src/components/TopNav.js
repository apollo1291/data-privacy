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
      <div class="topnav">

        <div class="nav">
          <p id="name"> Data-Link</p>
          <ul>
            <MenuOption name={"Home"} changePage={props.changePage} />
            <MenuOption name={"About"} changePage={props.changePage} />
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
    props.changePage({ Page: props.name });

  };

  return (
    <li><button className="navButton" onClick={handleClick}>

      {props.name}
    </button></li>
  );

}

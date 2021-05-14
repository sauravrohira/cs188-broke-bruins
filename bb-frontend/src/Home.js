import './App.css';
import NavBar from './NavBar';
import RentalList from './RentalList';
import { useState } from 'react'
import Button from '@material-ui/core/Button';
import ImageUpload from './ImageUpload';
import CreateListing from './CreateListing';
// import { useState } from 'react'
// import Button from '@material-ui/core/Button';
// import Input from '@material-ui/core/Input';
import Profile from './Profile';

function Home() {

  const [myAccount, setMyAccount] = useState(false);

  function changePage() {
    setMyAccount(!myAccount);
  }

  return (
    // <div>
    //   {!myAccount ? 
    //     (
    //       <div className="Home">
    //       <NavBar />
    //       <div className="Home-options">
    //           <span className="Button"><Button onClick={changePage}>My Account</Button></span>
    //       </div>
    //       {/* <FilterBar handleOrderChange={handleOrderChange} handleSortChange={handleSortChange} sort={{forwards, orderBy}} /> */}
    //       <RentalList />
    //       </div>
    //     ) : (
    //       <div> 
    //         <NavBar/>
    //         <div className="Home-options">
    //           <span className="Button"><Button onClick={changePage}>Home</Button></span>
    //         </div>
    //         <Profile/>
    //       </div>
    //     )}
    // </div>
    <CreateListing id={7}/>
  );
}

export default Home;

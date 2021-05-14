import './App.css';
import NavBar from './NavBar';
import RentalList from './RentalList';
import { useState } from 'react'
import Button from '@material-ui/core/Button';
// import Input from '@material-ui/core/Input';
import Profile from './Profile';

function Home() {

  const [myAccount, setMyAccount] = useState(false);

  function changePage() {
    setMyAccount(!myAccount);
  }

  return (
    <div>
      {myAccount ? 
        (
          <div className="Home">
          <NavBar />
          <div className="Home-options">
              <Button onClick={changePage}>My Account</Button>
          </div>
          {/* <FilterBar handleOrderChange={handleOrderChange} handleSortChange={handleSortChange} sort={{forwards, orderBy}} /> */}
          <RentalList />
          </div>
        ) : (
          <div> 
            <div className="Nav-bar">
              <Button onClick={changePage}>Home</Button>
            </div>
            <Profile/>
          </div>
        )}
    </div>
  );
}

export default Home;

import './App.css';
import NavBar from './NavBar';
// import { useState } from 'react'
// import Button from '@material-ui/core/Button';
// import Input from '@material-ui/core/Input';

function Home() {

  return (
    <div className="App">
        <NavBar />
        {/* <FilterBar handleOrderChange={handleOrderChange} handleSortChange={handleSortChange} sort={{forwards, orderBy}} /> */}
        {/* <ContactList sort={{forwards, orderBy}} /> */}
    </div>
  );
}

export default Home;

import './App.css';
import NavBar from './NavBar';
import RentalList from './RentalList';
import ImageUpload from './ImageUpload';
// import { useState } from 'react'
// import Button from '@material-ui/core/Button';
// import Input from '@material-ui/core/Input';

function Home() {

  return (
    <div className="Home">
        <NavBar />
        <ImageUpload />
        {/* <FilterBar handleOrderChange={handleOrderChange} handleSortChange={handleSortChange} sort={{forwards, orderBy}} /> */}
        <RentalList />
    </div>
  );
}

export default Home;

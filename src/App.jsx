// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import ContactPage from './contact';
import SupportPage from './Support';
import UserDetails from './UserDetails';

import "./styles/App.css"


function App() {
  return (
    <Router>
      <div className='MainDiv'>
        <NavBar />

        {/* <Link to="/">Home</Link>
      <Link to="/contact">contact US</Link> */}

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/support' element={<SupportPage />} />
          <Route path='/:username' element={<UserDetails/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

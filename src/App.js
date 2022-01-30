import React, { useMemo } from 'react';
import './App.css';
import HeaderBar from './HeaderBar.js';
import Home from './Home/Home.js';
import Art from './Art/Art.js';
import AboutMe from './AboutMe/AboutMe.js';
import { Routes, Route, useLocation } from 'react-router-dom';
import BackgroundMovement, { isScrolling} from './Background/Background';

const divStyle = {
  height: '100vh'
};

const App = () => {

  const backgroundMovement = new BackgroundMovement();
  const location = useLocation();

  React.useEffect(() => {
    let scrolling = true;
    backgroundMovement.nonScrolling.forEach(item => {
      if (location.pathname.includes(item)) {
        scrolling = false;
      }
    });
    backgroundMovement.setIsScrolling(scrolling);
  }, [location, backgroundMovement]);

  return (
    <div style={divStyle}>
      <HeaderBar />
      <Routes>
        <Route path="/" element={
          <Home 
            setScrolling={backgroundMovement.setIsScrolling}
          />
        } />
        <Route path="/home" element={
          <Home 
            setScrolling={backgroundMovement.setIsScrolling}
          />
        } />
        <Route path="/art" element={<Art />} />
        <Route path="ThomasTheYoung.com-2.0/about_me" element={<AboutMe />} />
        <Route path="/about_me" element={<AboutMe />} />
      </Routes>
    </div>
  );
}

export default App;

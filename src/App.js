import React, { useState } from 'react';
import './App.css';
import { moveBackground, nonScrolling } from './Background/Background.js';
import HeaderBar from './HeaderBar.js';
import Home from './Home/Home.js';
import Art from './Art/Art.js';
import AboutMe from './AboutMe/AboutMe.js';
import { Routes, Route, useLocation } from "react-router-dom";

const divStyle = {
  height: '100%'
};

const App = () => {

  const [scrolling, setScrolling] = useState(true);
  const location = useLocation();

  React.useEffect(() => {
    let scrolling = true;
    nonScrolling.forEach(item => {
      if (location.pathname.includes(item)) {
        scrolling = false;
      }
    });
    setScrolling(scrolling);
  }, [location]);

  
  return (
    <div style={divStyle} onMouseMove={event => moveBackground(event, scrolling)}>
      <HeaderBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="ThomasTheYoung.com-2.0" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="ThomasTheYoung.com-2.0/art" element={<Art />} />
        <Route path="/art" element={<Art />} />
        <Route path="ThomasTheYoung.com-2.0/about_me" element={<AboutMe />} />
        <Route path="/about_me" element={<AboutMe />} />
      </Routes>
    </div>
  );
}

export default App;

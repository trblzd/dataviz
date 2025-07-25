import React, { Suspense, useState } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Dimensions from './components/Mapas/Mapas';
import Header from './components/Header/Header';
import Contact from './components/Ajuda/Ajuda';
import Tool from './components/Ferramenta/Ferramenta';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Credits from './components/Creditos/Creditos';

import uparrow from "/up-arrow.png"


function App() {
  const [showBtn, setShowBtn] = useState("myBtn none");

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setShowBtn("myBtn");
    } else {
      setShowBtn("none");
    }
  }

  function topFunction() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <HashRouter>
      <div>
        <Header />
        <button onClick={topFunction} id="myBtn" className={showBtn} title="Go to top"><img src={uparrow} alt="Go to top" /></button>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Dimensions" element={<Dimensions />} />
            <Route path="/Tool" element={<Tool />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Credits" element={<Credits />} />
          </Routes>
          <Footer />
        </Suspense>
      </div>
    </HashRouter>
  );
}

export default App;

import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Mapas from './components/Mapas/Mapas';
import Header from './components/Header/Header';
import Ajuda from './components/Ajuda/Ajuda';
import Ferramenta from './components/Ferramenta/Ferramenta';
import Homee from './components/Homee/Home';
import Footer from './components/Footer/Footer';

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

  // Função adaptada para rolagem suave
  function topFunction() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <>
      <Router>
        <div>
          <Header />
          <button onClick={topFunction} id="myBtn" className={showBtn} title="Go to top">👆</button>
          <Suspense fallback={<h1>Carregando...</h1>}>
            <Routes>
              <Route path="/" element={<Homee />} />
              <Route path="/Dimensoes" element={<Mapas />} />
              <Route path="/Ferramenta" element={<Ferramenta />} />
              <Route path="/Ajuda" element={<Ajuda />} />
            </Routes>
            <Footer />
          </Suspense>
        </div>
      </Router>
    </>
  );
}

export default App;

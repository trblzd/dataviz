import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Mapas from './components/Mapas/Mapas';
import Header from './components/Header/Header';
import Ajuda from './components/Ajuda/Ajuda';
import Ferramenta from './components/Ferramenta/Ferramenta';
import Homee from './components/Homee/Home';
import Footer from './components/Footer/Footer';

function App() {
  return (
<>
<Router>

  <div>
    <Header/>
    <Suspense fallback={<h1>Carregando...</h1>}>
      <Routes>
        <Route path="/" element={<Homee/>}/>
        <Route path="/Dimensoes" element={<Mapas/>} />
        <Route path="/Ferramenta" element={<Ferramenta/>} />
        <Route path="/Ajuda" element={<Ajuda/>} />
      </Routes>
      <Footer/>
    </Suspense>
  </div>

</Router>
</>
  )
}

export default App

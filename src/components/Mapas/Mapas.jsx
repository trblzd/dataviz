import React from 'react';
import "./Mapas.css"

function MapContainer() {
  return (
    <div>
      <div className='MapasContainer'>
            <h1>Dimensão X</h1>
            <p>Foram utilizados dois indicadores (deorg e defor) para os períodos de 7 anos 
              que antecederam os censos agrários de 2006 e 2017. Deorg e defor fornecem medidas 
              de mudança de cobertura florestal em relação à floresta original e recente, 
              respectivamente (Rorato et al., 2023).</p>
        </div>
    <div className="container">
    <div className='left'>
    <div className="map-container">
      <iframe id="map" src="/mapa_interativo.html" title="Mapa Interativo 1"></iframe>
    </div>
    </div>

    <div className='right'>
    <div className="map-container">
    <iframe id="map" src="/mapa_interativo.html" title="Mapa Interativo 2"></iframe>
    </div>
    </div>
  </div>
  
  <div className='MapasContainer'>
            <h1>Dimensão X</h1>
            <p>Foram utilizados dois indicadores (deorg e defor) para os períodos de 7 anos 
              que antecederam os censos agrários de 2006 e 2017. Deorg e defor fornecem medidas 
              de mudança de cobertura florestal em relação à floresta original e recente, 
              respectivamente (Rorato et al., 2023).</p>
        </div>
    <div className="container">
    <div className='left'>
    <div className="map-container">
      <iframe id="map" src="/mapa_interativo.html" title="Mapa Interativo 1"></iframe>
    </div>
    </div>

    <div className='right'>
    <div className="map-container">
    <iframe id="map" src="/mapa_interativo.html" title="Mapa Interativo 2"></iframe>
    </div>
    </div>
  </div>
    </div>
  );
}

export default MapContainer;
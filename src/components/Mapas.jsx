import React from 'react';

function MapContainer() {
  return (
    <div>
            <h2>Teste Leaflet + React+Vite</h2>
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
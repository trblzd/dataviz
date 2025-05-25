import React from 'react';
import "./Mapas.css";
import deforestationmap from "../../assets/defor.jpg";


function MapContainer() {
  return (
    <div>
      <div className='MapasContainer'>
        <h6>INDICATOR</h6>
            <h1>Deforestation</h1>
            <p>Data source: PRODES (Brazilian Amazon Deforestation Monitoring Project from INPE). 
              Available in http://terrabrasilis.dpi.inpe.br/downloads/</p>
        </div>
    <div className="container">
      <img src={deforestationmap} alt="Map" className="map-image" />
    </div>
  

    </div>
  );
}

export default MapContainer;
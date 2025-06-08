import React from "react";
import './Ferramenta.css';

function Ferramenta() {
  return (
    <div className="ferramenta">
      <h1 className="ferramenta-title">Interactive Tool (SimpleNetInt)</h1>
      <iframe
        src="/simpleNetIntFiles/index.html"
        width="100%"
        height="900px"
        style={{ border: "none" }}
        title="SimpleNetInt 3D Tool"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Ferramenta;

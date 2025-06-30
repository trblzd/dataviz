import React from "react";
import './Ferramenta.css';

function Ferramenta() {
  return (
    <div className="ferramenta">
      <iframe
        src="/SimpleNetInt/index.html"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Interactive Tool"
      ></iframe>
    </div>
  );
}

export default Ferramenta;

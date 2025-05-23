import React from "react";
import "./Footer.css";
import uli from "/ULI.png"
const Footer = () => {
    return (
      <footer className="footer">
        <img src={uli}/>
        <p>© {new Date().getFullYear()} - Todos os direitos reservados.</p>
      </footer>
    );
  };
  
  export default Footer;
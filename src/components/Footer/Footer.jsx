import React from "react";
import { Link} from "react-router-dom";
import "./Footer.css";
import avLogo from "/logoalt.png";
import uli from "/ULI.png"
const Footer = () => {
    return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section footer-top">
          <div className="footer-logo">
            <img src={avLogo} alt="Amazon Views Logo" className="amazon-views-logo" />
          </div>

          <div className="footer-links">
            <h3 className="footer-heading">Navigation</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Tool">Interactive Tool</Link></li>
              <li><Link to="/Contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3 className="footer-heading">Dimensions</h3>
            <ul>
              <li><Link to="/Dimensions">Environmental</Link></li>
              <li><Link to="/Dimensions">Epidemiological</Link></li>
              <li><Link to="/Dimensions">Socioeconomic</Link></li>
              <li><Link to="/Dimensions">Economic</Link></li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />
        <div className="footer-section footer-bottom">
          <div className="footer-partners">
            <img src={uli} alt="Logos" className="partners-logo" />

          </div>

          <div className="footer-credits">
            <p><Link to="/Credits">Credits</Link></p>
          </div>
        </div>

      </div>
    </footer>
    );
  };
  
  export default Footer;
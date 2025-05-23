import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "/Logo.png";

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const triggerPoint = window.innerHeight * 0.8; 
        setIsScrolled(scrollPosition > triggerPoint);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <header className={`header ${isScrolled ? "solid" : "transparent"}`}>
            <div className='logo'>
                <Link to="/"><img src={Logo} alt="Logo" /></Link>
            </div>
            <div className='nav-links'>
              <Link to="/Dimensions">Dimensions</Link>
              <Link to="/Tool">Tool</Link>
              <Link to="/Contact">Contact</Link>
            </div>
        </header>
);
}

export default Header;
import { useState, useEffect } from "react";
import { Link,  useLocation } from "react-router-dom";
import "./Header.css";
import Logo from "/logoalt.png";

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
    if (location.pathname === "/" | "/#/") {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const triggerPoint = window.innerHeight * 0.8;
        setIsScrolled(scrollPosition > triggerPoint);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      
      setIsScrolled(true);
    }
  }, [location.pathname]);

    return (
        <header className={`header ${isScrolled ? "solid" : "transparent"}`}>
            <div className='logo'>
                <Link to="/"><img src={Logo} alt="Logo" /></Link>
            </div>
            <div className='nav-links'>
              <Link to="/">Home</Link>
              <Link to="/Dimensions">Dimensions</Link>
              <Link to="/Tool">Tool</Link>
              <Link to="/Contact">Contact</Link>
            </div>


        </header>
);
}

export default Header;
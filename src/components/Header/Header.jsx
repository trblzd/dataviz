import { useState, useEffect } from "react";
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
                <a href="/"><img src={Logo}/></a>
            </div>
            <div className='nav-links'>
                <a href="Dimensions">Dimensions</a>
                <a href="Tool">Tool</a>
                <a href="Contact">Contact</a>
            </div>
        </header>
);
}

export default Header;
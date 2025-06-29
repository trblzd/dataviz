import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import Logo from "/logoalt.png";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname.startsWith("/Dimensions")) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 100);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!location.pathname.startsWith("/Dimensions")) {
      setShowDropdown(false);
    }
  }, [location.pathname]);

  const isHomePage = location.pathname === "/" || location.pathname.startsWith("/Dimensions");
  let headerClass = "";

  if (isMobileMenuOpen && window.innerWidth <= 750) {
    headerClass = "solid mobile-menu-open fixed";
  } else if (isHomePage) {
    headerClass = isScrolled ? "solid fixed" : "transparent fixed";
  } else {
    headerClass = "solid static";
  }

  return (
    <header className={`header ${headerClass}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/"><img src={Logo} alt="Logo" /></Link>
        </div>

        <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <nav className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
          {location.pathname !== "/" && ( // Conditional render for Home link
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          )}

          <div className="dropdown-trigger" onClick={() => setShowDropdown(prev => !prev)}>
            Dimensions
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/Dimensions?dim=environmental" onClick={() => setIsMobileMenuOpen(false)}>Environmental</Link>
                <Link to="/Dimensions?dim=epidemiological" onClick={() => setIsMobileMenuOpen(false)}>Epidemiological</Link>
                <Link to="/Dimensions?dim=socioeconomic" onClick={() => setIsMobileMenuOpen(false)}>Socioeconomic</Link>
                <Link to="/Dimensions?dim=economic" onClick={() => setIsMobileMenuOpen(false)}>Economic</Link>
              </div>
            )}
          </div>

          <Link to="/Tool" onClick={() => setIsMobileMenuOpen(false)}>Tool</Link>
          <Link to="/Contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import Logo from "/logoalt.png";

function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
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

    const isHomePage = location.pathname === "/" || location.pathname.startsWith("/Dimensions");
    const headerClass = isHomePage 
        ? (isScrolled ? "solid fixed" : "transparent fixed")
        : "solid static";

    return (
        <header className={`header ${headerClass}`}>
            <div className="header-container">
                <div className='logo'>
                    <Link to="/"><img src={Logo} alt="Logo" /></Link>
                </div>
                <div className='nav-links'>
                    <Link to="/">Home</Link>
                    
                        <div 
                            className="dropdown-trigger" 
                            onClick={() => setShowDropdown(prev => !prev)}
                        >
                            Dimensions ▾
                            {showDropdown && (
                            <div className="dropdown-menu">
                                <Link to="/Dimensions?dim=environmental">Environmental</Link>
                                <Link to="/Dimensions?dim=epidemiological">Epidemiological</Link>
                                <Link to="/Dimensions?dim=socioeconomic">Socioeconomic</Link>
                                <Link to="/Dimensions?dim=economic">Economic</Link>
                            </div>
                            )}
                        </div>
                        

                    <Link to="/Tool">Tool</Link>
                    <Link to="/Contact">Contact</Link>
                </div>  
            </div>
        </header>
    );
}

export default Header;
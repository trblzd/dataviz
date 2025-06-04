import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import Logo from "/logoalt.png";

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            const handleScroll = () => {
                setIsScrolled(window.scrollY > 100);
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        } else {
            setIsScrolled(false);
        }
    }, [location.pathname]);

    const isHomePage = location.pathname === "/";
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
                    <Link to="/Dimensions">Dimensions</Link>
                    <Link to="/Tool">Tool</Link>
                    <Link to="/Contact">Contact</Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
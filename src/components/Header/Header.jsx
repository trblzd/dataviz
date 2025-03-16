import React from 'react';
import "./Header.css";

function Header() {
    return (
        <header className='header'>
            <div className='logo'>
                <a href="/">Logo</a>
            </div>
            <div className='nav-links'>
                <a href="Dimensoes">Dimensões</a>
                <a href="Ferramenta">Ferramenta</a>
                <a href="Ajuda">Ajuda</a>
            </div>
        </header>
);
}

export default Header;
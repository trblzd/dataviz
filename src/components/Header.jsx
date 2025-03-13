import React from 'react';

function Header() {
    return (
        <header className='header'>
            <div className='logo'>
                <a href="#">Logo</a>
            </div>
            <div className='nav-links'>
                <a href="#">Dimensões</a>
                <a href="#">Ferramenta</a>
                <a href="#">Ajuda</a>
            </div>
        </header>
);
}

export default Header;
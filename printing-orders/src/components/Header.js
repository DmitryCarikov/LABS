import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/orders">Orders</Link></li>
                    <li><Link to="/clients">Clients</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
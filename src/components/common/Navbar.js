// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the associated CSS file

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/cart">Cart</Link>
                </li>
                <li className="nav-item">
                    <Link to="/add-product">Add Product</Link> 
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

import React from 'react';
import User from '../../assets/User.png'; // User Img
import './NavBar.css'; // StyleSheet

function NavBar() {
    return (
        <nav>
            <h3 id="title">Gemini</h3>
            <img src={User} alt="" />
        </nav>
    )
}

export default NavBar;
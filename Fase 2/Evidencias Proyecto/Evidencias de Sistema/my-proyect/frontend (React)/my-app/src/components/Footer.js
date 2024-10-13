// src/components/Footer.js
import React from 'react';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
        </footer>
    );
}

export default Footer;

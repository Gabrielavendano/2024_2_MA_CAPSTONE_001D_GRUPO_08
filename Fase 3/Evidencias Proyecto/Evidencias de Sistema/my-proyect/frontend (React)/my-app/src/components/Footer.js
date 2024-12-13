import React from 'react';
import '../styles/Footer.css';

function Footer() {
    return (
      <footer className="footer">
        <div className="contact-info">
          <p>+56954183610 | +56954368445 | PerriotHotelCanino@gmail.com</p>
        </div>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div className="copyright">
          <p>© Todos los derechos reservados. Perriot Hotel Canino 2024</p>
        </div>
        <div className="footer-logo">
          <img src={`${process.env.PUBLIC_URL}/images/cropped-logo.png`} 
               alt="Perriot Hotel Canino" 
               className="logo-image" 
          />
          <h1>Perriot Hotel Canino</h1>
          <h2>y Club de Campo</h2>
          <p>★★★★★</p>
          <p>El mejor hotel sin caniles</p>
        </div>
        <div className="rights">
          <p>Todos los derechos reservados</p>
        </div>
      </footer>
    );
  }
  
  export default Footer;

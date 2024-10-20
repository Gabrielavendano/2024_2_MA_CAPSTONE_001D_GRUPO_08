import { Link } from 'react-router-dom';
import '../styles/Navbar.css';


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={`${process.env.PUBLIC_URL}/images/cropped-logo.png`} alt="Logo Perriot Hotel" className="navbar-logo-img" />
      </div>
      <ul className="navbar-list">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/about">Quiénes Somos</Link></li>
        <li><Link to="/services">Servicios</Link></li>
        <li><Link to="/gallery">Galería</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
      </ul>
      <div className="navbar-right">
        <Link to="/login" className="navbar-button">Iniciar Sesión</Link>
        <Link to="/register" className="navbar-button">Registrarse</Link>
      </div>
    </nav>
  );
}

export default Navbar;




import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/store">Tienda</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
      </ul>
      <div className="navbar-right">
        <li className="navbar-item"><Link to="/login" className="navbar-button">Iniciar Sesión</Link></li>
        <li className="navbar-item"><Link to="/register" className="navbar-button">Registrarse</Link></li>
      </div>
    </nav>
  );
}

export default Navbar;




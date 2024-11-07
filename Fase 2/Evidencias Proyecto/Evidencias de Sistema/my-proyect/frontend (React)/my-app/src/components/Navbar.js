import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useAuth } from '../AuthContext';
import { useState } from 'react';

function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para manejar el menú

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Cambiar el estado al hacer clic
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
      <div className="navbar-logo">
        <img
          src={`${process.env.PUBLIC_URL}/images/cropped-logo.png`}
          alt="Logo Perriot Hotel"
          className="navbar-logo-img"
        />
      </div>

      {/* Botón de hamburguesa */}
      <div className="hamburger" onClick={toggleMenu}>
        &#9776; {/* Símbolo de hamburguesa */}
      </div>

      <ul className="navbar-list">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/about">Quiénes Somos</Link></li>
        <li><Link to="/services">Servicios</Link></li>
        <li><Link to="/gallery">Galería</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
        {user && user.is_superuser && (
          <>
            <li><Link to="/reservas">Reservas</Link></li>
            <li><Link to="/contactos">Contactos</Link></li>
          </>
        )}
      </ul>

      <div className="navbar-right">
        {user ? (
          <>
            <span>Bienvenido, {user.firstName} {user.lastName}</span>
            <button onClick={logout} className="navbar-button2">Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-button">Iniciar Sesión</Link>
            <Link to="/register" className="navbar-button">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

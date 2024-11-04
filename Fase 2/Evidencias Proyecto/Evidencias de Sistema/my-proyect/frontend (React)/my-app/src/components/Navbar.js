import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useAuth } from '../AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src={`${process.env.PUBLIC_URL}/images/cropped-logo.png`}
          alt="Logo Perriot Hotel"
          className="navbar-logo-img"
        />
      </div>
      <ul className="navbar-list">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/about">Quiénes Somos</Link></li>
        <li><Link to="/services">Servicios</Link></li>
        <li><Link to="/gallery">Galería</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
        {user && <li><Link to="/mis-reservas">Mis Reservas</Link></li>}
        {user && user.is_superuser && ( // Verifica si el usuario es superusuario
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
            <button onClick={logout} className="navbar-button">Cerrar Sesión</button>
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

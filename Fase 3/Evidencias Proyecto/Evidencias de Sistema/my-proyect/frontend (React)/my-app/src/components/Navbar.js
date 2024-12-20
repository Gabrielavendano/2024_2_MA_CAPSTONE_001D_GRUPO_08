import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useAuth } from '../AuthContext';
import { useState, useEffect } from 'react';

function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para manejar el menú

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Cambiar el estado al hacer clic
  };

  useEffect(() => {
    console.log(user); // Verifica el estado del usuario cuando se actualiza
  }, [user]); // Solo se ejecuta cuando el valor de user cambia

  return (
    <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
      <div className="navbar-logo">
        <img
          src={`${process.env.PUBLIC_URL}/images/cropped-logo.png`}
          alt="Logo Perriot Hotel"
          className="navbar-logo-img"
        />
      </div>

     

      <ul className="navbar-list">
        {/* Enlaces visibles para todos */}
        <li><Link to="/">Inicio</Link></li>
        
        {!user?.is_superuser && (
          <>
            <li><Link to="/about">Quiénes Somos</Link></li>
            <li><Link to="/reservar">Reservar</Link></li>
            <li><Link to="/services">Servicios</Link></li>
            <li><Link to="/gallery">Galería</Link></li>
            <li><Link to="/contact">Contacto</Link></li>
          </>
        )}

        {user && !user.is_superuser && (
          <li><Link to="/mis-reservas">Mis Reservas</Link></li>
        )}

        {user?.is_superuser && (
          <>
            <li><Link to="/reservas">Reservas</Link></li>
            <li><Link to="/contactos">Contactos</Link></li>
          </>
        )}
      </ul>

      <div className="navbar-right">
        {user ? (
          <>
            {user.is_superuser ? (
              <span>Bienvenido, Admin</span> // Mostrar "Admin" si es administrador
            ) : (
              <span>Bienvenido, {user.first_name} {user.last_name}</span>
            )}
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

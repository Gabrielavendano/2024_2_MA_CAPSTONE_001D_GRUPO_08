import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Usamos el login desde el contexto
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtener login del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Llamamos al login en el contexto
    try {
      await login({ email, password }); // Pasamos directamente las credenciales
      alert('Inicio de sesión exitoso');
      navigate('/'); // Redirige a la página de inicio
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert(error.response?.data?.error || 'Error en el inicio de sesión');
    }
  };

  return (
    <div>
      <h1 className="page-title">Iniciar Sesión</h1>
      <form className="users-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="button-group">
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

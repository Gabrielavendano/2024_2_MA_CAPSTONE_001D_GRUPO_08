import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializar navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password,
      });
      alert('Inicio de sesión exitoso');
      setEmail(''); // Limpiar campo email
      setPassword(''); // Limpiar campo password
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error en el inicio de sesión');
    }
};

  // Función para volver a la página anterior
  const handleGoBack = () => {
    navigate('/'); // Navegar a la página anterior
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
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
      <button type="button" onClick={handleGoBack} className="back-button">
        Volver
      </button>
    </div>
      </form>
    </div>
  );
};

export default Login;



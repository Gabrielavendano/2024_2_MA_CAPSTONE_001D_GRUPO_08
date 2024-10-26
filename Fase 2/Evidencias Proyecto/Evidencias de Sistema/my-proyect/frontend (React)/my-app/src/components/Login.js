import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Usa login desde el contexto

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password,
      });

      // Aquí se espera que la respuesta contenga un objeto user con las propiedades adecuadas
      login({
        firstName: response.data.user.first_name,
        lastName: response.data.user.last_name,
        email: response.data.user.email,
        isAdmin: response.data.user.is_admin,
      });
      alert('Inicio de sesión exitoso');
      navigate('/'); // Redirige a la página de inicio
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert(error.response?.data?.error || 'Error en el inicio de sesión'); // Muestra el mensaje de error del backend
    }
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
        </div>
      </form>
    </div>
  );
};

export default Login;

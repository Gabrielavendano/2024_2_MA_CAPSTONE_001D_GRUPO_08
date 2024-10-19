import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const navigate = useNavigate(); // Inicializar navigate
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
        alert('Las contraseñas no coinciden');
        return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password
      });
      alert('Registro exitoso');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
      });  // Limpiar campos después del registro
    } catch (error) {
      console.error('Error al registrar:', error);
    }
};

  // Función para volver a la página anterior
  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="Nombre"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Apellido"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirm_password"
          placeholder="Repetir Contraseña"
          value={formData.confirm_password}
          onChange={handleChange}
          required
        />
    <div className="button-group">
      <button type="submit" className="login-button">
        Registrarse
      </button>
      <button type="button" onClick={handleGoBack} className="back-button">
        Volver
      </button>
    </div>
      </form>
    </div>
  );
};

export default Register;

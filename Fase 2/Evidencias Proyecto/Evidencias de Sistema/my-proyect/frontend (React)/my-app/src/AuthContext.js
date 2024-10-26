import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './axiosConfig';

const AuthContext = createContext(null); // Asegúrate de pasar null como valor inicial

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    navigate('/');
  };

  const register = async (userData) => {
    try {
      await api.post('/register/', userData);
      alert("Usuario registrado exitosamente");
      navigate('/login');
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error en el registro");
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

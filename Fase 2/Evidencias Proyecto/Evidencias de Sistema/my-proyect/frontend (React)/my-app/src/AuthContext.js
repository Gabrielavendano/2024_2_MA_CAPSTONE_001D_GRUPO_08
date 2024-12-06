import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken } from './axiosConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para el usuario autenticado
  const [token, setToken] = useState(localStorage.getItem('token')); // Estado para el token
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de usuario
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si ya hay un token en localStorage
    const savedToken = localStorage.getItem('token');
    
    if (savedToken) {
      setToken(savedToken);
      setAuthToken(savedToken);
  
      if (!user) {
        setLoading(true); // Comenzamos el estado de carga
  
        api.get('http://localhost:8000/admin/auth/user/', { 
          headers: { Authorization: `Bearer ${savedToken}` }
        })
        .then(response => {
          setUser(response.data);
          console.log("Usuario cargado: ", response.data);
        })
        .catch(error => {
          if (error.response && error.response.status !== 401) {
            console.error('Error al obtener el usuario:', error);
          }
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
      }
    } else {
      setLoading(false); // Si no hay token, terminamos la carga
    }
  }, [token]); // Cambiar la dependencia a 'token'
  

  const login = async (credentials) => {
    try {
      const response = await api.post('/login/', credentials);
      setUser(response.data.user);
      setToken(response.data.token);
      setAuthToken(response.data.token);

      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales incorrectas");
    }
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
    setToken(null);
    setAuthToken(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
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

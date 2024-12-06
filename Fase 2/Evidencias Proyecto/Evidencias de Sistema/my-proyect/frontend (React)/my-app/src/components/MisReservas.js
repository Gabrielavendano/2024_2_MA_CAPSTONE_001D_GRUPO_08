import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import "../styles/Reservas.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


function ReservesUser() {
  const [reserves, setReserves] = useState([]);
  const { token, user } = useAuth();

  useEffect(() => {
    if (token && user) { // Solo llama si hay un token y un usuario autenticado
      fetchReserves();
    }
  }, [token, user]);

  const fetchReserves = async () => {
    try {
      // Ahora solo realiza una llamada al endpoint sin pasar params de usuario
      const response = await axios.get("http://localhost:8000/reserves/my_reserves/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReserves(response.data);
    } catch (error) {
      console.error("Error fetching reserves:", error);
    }
  };
  
  

  // SE APLICA EL FORMATO DE NÚMEROS PARA LOS PRECIOS
  function numberFormat(number) {
    // SE ASEGURA DE QUE LOS NÚMEROS TENGAN SEPARACIÓN DE MILES Y DECIMALES
    const formattedNumber = number.toLocaleString('de-DE');
    return formattedNumber;
}
  

  return (
    <div>
      <h1>Mis Reservas</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Nombre Mascota</th>
            <th>Tamaño Mascota</th>
            <th>Raza</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {reserves.map((reserve) => (
            <tr key={reserve.id}>
              <td>{reserve.id}</td>
              <td>{reserve.email}</td>
              <td>{reserve.pet_name}</td>
              <td>{reserve.pet_size}</td>
              <td>{reserve.pet_breed}</td>
              <td>{reserve.init_date}</td>
              <td>{reserve.end_date}</td>
              <td>$ {numberFormat(reserve.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservesUser;

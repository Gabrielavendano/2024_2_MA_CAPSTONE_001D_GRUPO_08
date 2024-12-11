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
    if (token && user) {
      fetchReserves();
    }
  }, [token, user]);

  const fetchReserves = async () => {
    try {
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

  function numberFormat(number) {
    return number.toLocaleString("de-DE");
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
            <th>Fecha Ingreso</th>
            <th>Fecha Retiro</th>
            <th>Servicios</th>
            <th>Total Base</th>
            <th>Total</th>
            <th>Pagado</th>
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
              <td>
                {Array.isArray(reserve.services) && reserve.services.length > 0 ? (
                  reserve.services.map((service, index) => (
                    <div key={index}>
                      {service.name} - ${numberFormat(service.price || 0)}
                    </div>
                  ))
                ) : (
                  "No se seleccionaron servicios"
                )}
              </td>

              <td>$ {numberFormat(reserve.total_reserva)}</td>
              <td>$ {numberFormat(reserve.total)}</td>
              <td>{reserve.pagado ? "Sí" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservesUser;

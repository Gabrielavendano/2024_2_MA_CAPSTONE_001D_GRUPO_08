import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Reservas.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function ReservesAdmin() {
  const [reserves, setReserves] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchReserves();
  }, []);

  const fetchReserves = async () => {
    try {
      const response = await axios.get("http://localhost:8000/reserves/get/");
      setReserves(response.data);
    } catch (error) {
      console.error("Error fetching reserves:", error);
    }
  };

  const handleEdit = (reserve) => {
    setEditing(reserve.id);
    setEditData({ ...reserve });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/reserves/edit/${editing}/`, editData);
      setEditing(null);
      fetchReserves();
    } catch (error) {
      console.error("Error updating reserve:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/reserves/delete/${id}/`);
      fetchReserves();
    } catch (error) {
      console.error("Error deleting reserve:", error);
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
      <h1>Reservas</h1>
      <table className="admin-table">
      <thead>
        <tr>
          <th>ID Reserva</th>
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
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {reserves.map((reserve) => (
          <tr key={reserve.id}>
            {editing === reserve.id ? (
              <>
                <td>{reserve.id}</td>
                <td>
                  <input
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    value={editData.pet_name}
                    onChange={(e) => setEditData({ ...editData, pet_name: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    value={editData.pet_size}
                    onChange={(e) => setEditData({ ...editData, pet_size: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    value={editData.pet_breed}
                    onChange={(e) => setEditData({ ...editData, pet_breed: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={editData.init_date}
                    onChange={(e) => setEditData({ ...editData, init_date: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={editData.end_date}
                    onChange={(e) => setEditData({ ...editData, end_date: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    value={editData.services.join(", ")}
                    onChange={(e) => setEditData({ ...editData, services: e.target.value.split(", ") })}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={editData.total_reserva}
                    onChange={(e) => setEditData({ ...editData, total_reserva: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={editData.total}
                    onChange={(e) => setEditData({ ...editData, total: e.target.value })}
                  />
                </td>
                <td>
                  <select
                    value={editData.pagado}
                    onChange={(e) => setEditData({ ...editData, pagado: e.target.value === "true" })}
                  >
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </td>
                <td>
                  <button className="btn btn-outline-success btn-sm" onClick={handleSave}>
                    Guardar
                  </button>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => setEditing(null)}>
                    Cancelar
                  </button>
                </td>
              </>
            ) : (
              <>
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
                <td>
                  <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(reserve)}>
                    Editar
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(reserve.id)}>
                    Eliminar
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>

      </table>
    </div>
  );
}

export default ReservesAdmin;

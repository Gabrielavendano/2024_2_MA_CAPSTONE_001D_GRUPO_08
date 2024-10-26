import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reservas = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/reservas/');
                setReservas(response.data);
            } catch (error) {
                console.error('Error fetching reservas:', error);
            }
        };
        
        fetchReservas();
    }, []);

    return (
        <div>
            <h1>Lista de Reservas</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Nombre de la Mascota</th>
                        <th>Raza</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva) => (
                        <tr key={reserva.id}>
                            <td>{reserva.id}</td>
                            <td>{reserva.nombre}</td>
                            <td>{reserva.telefono}</td>
                            <td>{reserva.nombre_mascota}</td>
                            <td>{reserva.raza}</td>
                            <td>{reserva.precio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reservas;

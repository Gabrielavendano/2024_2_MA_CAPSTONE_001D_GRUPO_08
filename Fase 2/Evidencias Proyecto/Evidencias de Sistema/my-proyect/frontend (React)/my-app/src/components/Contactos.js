import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Contactos = () => {
    const [contactos, setContactos] = useState([]);

    useEffect(() => {
        const fetchContactos = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/contactos/');
                setContactos(response.data);
            } catch (error) {
                console.error('Error fetching contactos:', error);
            }
        };

        fetchContactos();
    }, []);

    return (
        <div>
            <h1>Lista de Contactos</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Mensaje</th>
                    </tr>
                </thead>
                <tbody>
                    {contactos.map((contacto) => (
                        <tr key={contacto.id}>
                            <td>{contacto.id}</td>
                            <td>{contacto.nombre}</td>
                            <td>{contacto.correo}</td>
                            <td>{contacto.mensaje}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Contactos;

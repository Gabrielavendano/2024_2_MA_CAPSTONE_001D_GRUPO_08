import React, { useEffect, useState } from 'react';
import "../styles/MisReservas.css";
import axios from 'axios';
import { useAuth } from '../AuthContext';

const MisReservas = () => {
    const [misReservas, setMisReservas] = useState([]);
    const { user } = useAuth();

    useEffect(() =>  {
        const data = async () => {
            try {
            const response = await axios.get('http://localhost:8000/reserves/get/'+ user.id );
            //console.log(response)
            setMisReservas(response)
            } catch (error) {
                console.error('Error al obtener mis reservas:', error);// Muestra el mensaje de error del backend
            }
        }
        data(); 
        
    
    }, [])

    return <></>

}

export default MisReservas
import React, { useEffect, useState } from 'react';
import CardServicio from './CardServicio';
import "../styles/Services.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';




function Services() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);

  
  useEffect(() =>  {
    const data = async () => {
      try {
        const response = await axios.get('http://localhost:8000/services/getall');
        setServices(response.data)
      } catch (error) {
        console.error('Error al obtener servicios:', error);// Muestra el mensaje de error del backend
      }
    }
    data(); 
    
  }, [])

  const sv =  services.map((service) => 
    <CardServicio name = {service.name} price = {service.price} info = {service.info} image={service.image}></CardServicio>
  )
  const navigate = useNavigate();

  return (
    <section>
      <h1>Servicios</h1>
      {/* <ul>
        <li>Alojamiento personalizado para tu perro</li>
        <li>Paseos y actividades recreativas</li>
        <li>Spa y cuidado estético canino</li>
        <li>Atención veterinaria y monitoreo de salud</li>
      </ul>
      <></> */}
      <div className='services'>
        {sv}
      </div>
      {user &&
      <div className='button-wrapper'>
        <button className='button-service' onClick={() => {navigate('/reservar');}} >Reservar</button>
      </div>}
      
    </section>
  );
}

export default Services;
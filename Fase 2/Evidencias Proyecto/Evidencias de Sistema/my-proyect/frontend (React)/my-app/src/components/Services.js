import React from 'react';

function Services() {
  return (
    <section>
      <h1>Servicios</h1>
      <ul>
        <li>Alojamiento personalizado para tu perro</li>
        <li>Paseos y actividades recreativas</li>
        <li>Spa y cuidado estético canino</li>
        <li>Atención veterinaria y monitoreo de salud</li>
      </ul>
      <button onClick={() => navigate("/reservar")}>Reservar</button>
    </section>
  );
}

export default Services;
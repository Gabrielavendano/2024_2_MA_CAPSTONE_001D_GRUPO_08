import React from 'react';

function About() {
  return (
    <section style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '80px',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      lineHeight: '1.6',
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '2em',
        color: '#007bff',
        marginBottom: '20px',
      }}
      >Quiénes Somos</h1>
      
      <p style={{ fontSize: '1.1em', marginBottom: '15px' }}>
        Perriot Hotel fue fundado en [año] con la misión de proporcionar el mejor cuidado para tu amigo canino.
      </p>
      
      <p style={{ fontSize: '1.1em', marginBottom: '15px' }}>
        Contamos con años de experiencia y un equipo especializado en el bienestar de los perros.
      </p>
      
      <p style={{ fontSize: '1.1em' }}>
        Nuestras instalaciones están diseñadas para proporcionar comodidad, seguridad y felicidad a tu mascota.
      </p>
    </section>
  );
}

export default About;

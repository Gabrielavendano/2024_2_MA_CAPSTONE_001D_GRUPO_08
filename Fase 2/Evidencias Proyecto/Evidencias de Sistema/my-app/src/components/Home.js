import React from 'react';

function Home() {
  return (
    <div>
      <h1>Bienvenido a nuestra Página de Inicio</h1>
      <section>
        <h2>Noticias</h2>
        <p>Aquí encontrarás las últimas noticias sobre nuestros servicios.</p>
        {/* Aquí podrías agregar un componente de lista de noticias dinámicas */}
      </section>
      <section>
        <h2>Consejos</h2>
        <p>Consejos útiles para el adiestramiento de tu mascota.</p>
        {/* Puedes agregar consejos que se carguen desde un API */}
      </section>
    </div>
  );
}

export default Home;

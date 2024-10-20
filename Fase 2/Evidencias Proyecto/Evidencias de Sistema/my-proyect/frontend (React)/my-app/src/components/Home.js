import React from 'react';
import Carousel from './Carousel';

function Home() {
    const carouselImages = [
        'https://via.placeholder.com/600x300.png?text=Perriot+Hotel+-+Tu+mejor+opción',
        'https://via.placeholder.com/600x300.png?text=Cuidado+Exclusivo+para+Perros',
        'https://via.placeholder.com/600x300.png?text=Reserva+con+nosotros',
    ];

    return (
        <div>
            <h1>Bienvenido a Perriot Hotel</h1>
            <p>El mejor cuidado para tu amigo canino.</p>
            <section>
                <h2>Nuestras Instalaciones</h2>
                <Carousel images={carouselImages} />
            </section>
            <section>
                <h2>Consejos para el cuidado de tu mascota</h2>
                <p>Consejos útiles sobre la alimentación, el ejercicio y la salud de tu perro.</p>
            </section>
        </div>
    );
}

export default Home;


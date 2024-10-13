import React from 'react';
import Carousel from './Carousel';

function Home() {
    const carouselImages = [
        'https://via.placeholder.com/600x300.png?text=Noticia+1',
        'https://via.placeholder.com/600x300.png?text=Noticia+2',
        'https://via.placeholder.com/600x300.png?text=Noticia+3',
    ];

    return (
        <div>
            <h1>Bienvenido a nuestra Página de Inicio</h1>
            <section>
                <h2>Noticias</h2>
                <Carousel images={carouselImages} />
            </section>
            <section>
                <h2>Consejos</h2>
                <p>Consejos útiles para el adiestramiento de tu mascota.</p>
            </section>
        </div>
    );
}

export default Home;


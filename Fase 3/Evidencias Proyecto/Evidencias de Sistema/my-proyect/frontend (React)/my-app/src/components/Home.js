import React from 'react';
import Carousel from './Carousel';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
    const navigate = useNavigate();

    const handleReservationClick = () => {
        navigate('/reservar');
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Bienvenido a Perriot Hotel</h1>
            <p className="home-subtitle">El mejor cuidado para tu amigo canino.</p>
            
            <div className="home-carousel-wrapper">
                <Carousel
                    images={[
                        'https://capuybigotes.com/wp-content/uploads/2020/01/mestiso.jpg',
                        'https://i.pinimg.com/originals/91/d8/9e/91d89ea00a3f2e9a3d326152da4a2548.jpg',
                        'https://1.bp.blogspot.com/-W1baZJhmJyM/UUFTSxLqLjI/AAAAAAAAA6Y/aoNKHVSSzlU/s1600/10.jpg',
                    ]}
                />
                <button className="home-reserve-button" onClick={handleReservationClick}>
                    ¡Reserva ahora y asegura el mejor cuidado para tu mascota!
                </button>
            </div>

            <div className="home-advice-section">
                <h2 className="home-advice-title">Consejos para el cuidado de tu mascota</h2>
                <p className="home-advice-description">
                    Consejos útiles sobre la alimentación, el ejercicio y la salud de tu perro.
                </p>
                <div className="home-advice-list">
                    <div className="home-advice-item">
                        <img 
                            src="https://img.freepik.com/vector-premium/cachorro-nino-lindo-perro-collar-lengua-cola-adorable-estilo-historieta-comica_191307-901.jpg"
                            alt="Perro feliz"
                            className="home-advice-image"
                        />
                        <p className="home-advice-text"><strong>1. Alimentación equilibrada:</strong> Proporciónale una dieta balanceada para que esté sano y feliz.</p>
                    </div>
                    <div className="home-advice-item">
                        <img 
                            src="https://img.freepik.com/vector-premium/linda-mascota-perro-haciendo-ejercicio-levantando-pesas-ilustracion-dibujos-animados_587427-623.jpg"
                            alt="Ejercicio de mascotas"
                            className="home-advice-image"
                        />
                        <p className="home-advice-text"><strong>2. Ejercicio diario:</strong> Llévalo a pasear y juega con él para mantenerlo activo.</p>
                    </div>
                    <div className="home-advice-item">
                        <img 
                            src="https://static.vecteezy.com/system/resources/previews/000/433/252/original/veterinarian-doctor-helping-a-dog-vector.jpg"
                            alt="Visita al veterinario"
                            className="home-advice-image"
                        />
                        <p className="home-advice-text"><strong>3. Visitas al veterinario:</strong> Lleva a tu mascota al veterinario regularmente para revisiones.</p>
                    </div>
                    <div className="home-advice-item">
                        <img 
                            src="https://img.freepik.com/vector-premium/feliz-lindo-nino-nino-nina-jugar-perro-mascota_97632-2978.jpg?w=2000"
                            alt="Cariño Mascota"
                            className="home-advice-image"
                        />
                        <p className="home-advice-text"><strong>4. Cariño y atención:</strong> Dale mucho amor, afecto y tiempo de calidad.</p>
                    </div>
                    <div className="home-advice-item">
                        <img 
                            src="https://tse3.mm.bing.net/th?id=OIP.-Rg5hDwo3OxLTd4xXopHKgHaGz&pid=Api&P=0&h=180"
                            alt="Espacio seguro"
                            className="home-advice-image"
                        />
                        <p className="home-advice-text"><strong>5. Espacio seguro:</strong> Crea un lugar cómodo donde pueda descansar y sentirse protegido.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

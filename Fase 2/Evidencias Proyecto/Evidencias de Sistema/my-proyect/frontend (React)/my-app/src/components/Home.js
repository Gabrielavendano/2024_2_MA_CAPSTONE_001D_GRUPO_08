import React from 'react';
import Carousel from './Carousel';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
    const navigate = useNavigate();
    const [hover, setHover] = React.useState(false);

    const carouselImages = [
        'https://capuybigotes.com/wp-content/uploads/2020/01/mestiso.jpg',
        'https://i.pinimg.com/originals/91/d8/9e/91d89ea00a3f2e9a3d326152da4a2548.jpg',
        'https://1.bp.blogspot.com/-W1baZJhmJyM/UUFTSxLqLjI/AAAAAAAAA6Y/aoNKHVSSzlU/s1600/10.jpg',
    ];

    const handleReservationClick = () => {
        navigate('/reservar'); 
    };

    const styles = {
        container: {
            width:'80%',
            margin: '0 auto',
            padding: '100px',
            backgroundColor: '#fdfdfd',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column', // Cambiamos a columna para apilar elementos
        },
        title: {
            fontSize: '2.5rem',
            textAlign: 'center',
            color: '#2c3e50',
            marginBottom: '30px',
        },
        subtitle: {
            fontSize: '1.2rem',
            textAlign: 'center',
            color: '#34495e',
            marginBottom: '20px',
        },
        carouselSection: {
            display: 'flex',  // Usamos flexbox para el carrusel y el botón
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px', // Separación inferior
        },
        sectionTitle: {
            color: '#333',
            paddingBottom: '5px',
            marginBottom: '15px',
            textAlign: 'center',
        },
        button: {
            backgroundColor: hover ? '#3e4b8e' : '#171f5e',
            padding: '40px 150px',
            borderRadius: '40px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '3rem',
        },
        description: {
            fontSize: '1rem',
            color: '#34495e',
            marginTop: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        adviceList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        adviceItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            backgroundColor: '#f9f9f9',
            padding: '10px',
            borderRadius: '5px',
        },
        adviceImage: {
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            objectFit: 'cover',
        },
        adviceText: {
            color: '#333',
            fontSize: '1rem',
        },
    };

    return (
        <div style={styles.container}>
            <h1 className="page-title">Bienvenido a Perriot Hotel</h1>
            <p style={styles.subtitle}>El mejor cuidado para tu amigo canino.</p>
            <div>
                <Carousel images={carouselImages} />
                <div style={{ textAlign: 'center' }}>
                <h2 style={styles.sectionTitle}>Si se va de vacaciones y no sabe donde dejar su mascota...</h2>
                <h2 style={styles.sectionTitle}>Reserve aquí!</h2>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                    <button style={styles.button}     onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}onClick={handleReservationClick}>
                        Reservar
                    </button>
                </div>
            <br>
            </br>
            </div>
            <h2 style={styles.sectionTitle}>Consejos para el cuidado de tu mascota</h2>
            <p style={styles.description}>
                Consejos útiles sobre la alimentación, el ejercicio y la salud de tu perro.
            </p>
            <div style={styles.adviceList}>
                <div style={styles.adviceItem}>
                    <img 
                        src="https://img.freepik.com/vector-premium/cachorro-nino-lindo-perro-collar-lengua-cola-adorable-estilo-historieta-comica_191307-901.jpg" 
                        alt="Perro feliz" 
                        style={styles.adviceImage} 
                    />
                    <p style={styles.adviceText}><strong>1. Alimentación equilibrada:</strong> Proporciónale una dieta balanceada para que esté sano y feliz.</p>
                </div>
                <div style={styles.adviceItem}>
                    <img 
                        src="https://img.freepik.com/vector-premium/linda-mascota-perro-haciendo-ejercicio-levantando-pesas-ilustracion-dibujos-animados_587427-623.jpg" 
                        alt="Ejercicio de mascotas" 
                        style={styles.adviceImage} 
                    />
                    <p style={styles.adviceText}><strong>2. Ejercicio diario:</strong> Llévalo a pasear y juega con él para mantenerlo activo.</p>
                </div>
                <div style={styles.adviceItem}>
                    <img 
                        src="https://static.vecteezy.com/system/resources/previews/000/433/252/original/veterinarian-doctor-helping-a-dog-vector.jpg" 
                        alt="Visita al veterinario" 
                        style={styles.adviceImage} 
                    />
                    <p style={styles.adviceText}><strong>3. Visitas al veterinario:</strong> Lleva a tu mascota al veterinario regularmente para revisiones.</p>
                </div>
                <div style={styles.adviceItem}>
                    <img 
                        src="https://img.freepik.com/vector-premium/feliz-lindo-nino-nino-nina-jugar-perro-mascota_97632-2978.jpg?w=2000" 
                        alt="Cariño Mascota" 
                        style={styles.adviceImage} 
                    />
                    <p style={styles.adviceText}><strong>4. Cariño y atención:</strong> Dale mucho amor, afecto y tiempo de calidad.</p>
                </div>
                <div style={styles.adviceItem}>
                    <img 
                        src="https://tse3.mm.bing.net/th?id=OIP.-Rg5hDwo3OxLTd4xXopHKgHaGz&pid=Api&P=0&h=180" 
                        alt="Espacio seguro" 
                        style={styles.adviceImage} 
                    />
                    <p style={styles.adviceText}><strong>5. Espacio seguro:</strong> Crea un lugar cómodo donde pueda descansar y sentirse protegido.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;





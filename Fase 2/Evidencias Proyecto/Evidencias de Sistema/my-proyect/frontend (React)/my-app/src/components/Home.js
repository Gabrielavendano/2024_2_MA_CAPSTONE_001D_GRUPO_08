import React from 'react';
import Carousel from './Carousel';

function Home() {
    const carouselImages = [
        'https://capuybigotes.com/wp-content/uploads/2020/01/mestiso.jpg',
        'https://i.pinimg.com/originals/91/d8/9e/91d89ea00a3f2e9a3d326152da4a2548.jpg',
        'https://1.bp.blogspot.com/-W1baZJhmJyM/UUFTSxLqLjI/AAAAAAAAA6Y/aoNKHVSSzlU/s1600/10.jpg',
    ];

    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '180px',
            backgroundColor: '#fdfdfd',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        },
        title: {
            fontSize: '2.5rem',
            textAlign: 'center',
            color: '#2c3e50',
            marginBottom: '10px',
        },
        subtitle: {
            fontSize: '1.2rem',
            textAlign: 'center',
            color: '#34495e',
            marginBottom: '20px',
        },
        section: {
            margin: '30px 0',
            padding: '20px',
            backgroundColor: '#eaf7f5',
            borderRadius: '8px',
        },
        sectionTitle: {
            color: '#333',
            borderBottom: '2px solid #5cb85c',
            paddingBottom: '5px',
            marginBottom: '15px',
        },
        sectionParagraph: {
            color: '#555',
            lineHeight: '1.6',
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
        adviceText: {
            color: '#333',
            fontSize: '1rem',
        },
        adviceImage: {
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            objectFit: 'cover',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Bienvenido a Perriot Hotel</h1>
            <p style={styles.subtitle}>El mejor cuidado para tu amigo canino.</p>
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Nuestras Instalaciones</h2>
                <Carousel images={carouselImages} />
            </section>
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Consejos para el cuidado de tu mascota</h2>
                <p style={styles.sectionParagraph}>
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
            </section>
        </div>
    );
}

export default Home;


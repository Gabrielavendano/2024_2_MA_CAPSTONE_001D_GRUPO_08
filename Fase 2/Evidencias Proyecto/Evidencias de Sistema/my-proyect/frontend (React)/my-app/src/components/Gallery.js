import React from 'react';
import "../styles/Gallery.css";

function Gallery() {
  const galleryImages = [
    '/images/foto.jpeg',
    '/images/pieza1.jpg',
    '/images/pieza2.jpg',
    '/images/pieza3.jpg',
    '/images/pieza4.jpg',
  ];

  return (
    <section>
      <h1>Galería</h1>
      <div className="gallery">
        {galleryImages.map((url, index) => (
          <img key={index} src={url} alt={`Imagen ${index + 1}`} />
        ))}
      </div>
    </section>
  );
}

export default Gallery;
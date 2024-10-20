import React from 'react';

function Gallery() {
  const galleryImages = [
    'https://via.placeholder.com/600x400.png?text=Habitación+1',
    'https://via.placeholder.com/600x400.png?text=Habitación+2',
    'https://via.placeholder.com/600x400.png?text=Área+de+Juegos',
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
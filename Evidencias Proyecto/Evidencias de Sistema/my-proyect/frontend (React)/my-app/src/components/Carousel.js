import React, { useState } from 'react';
import '../styles/Carousel.css';  // Para los estilos

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="carousel">
      <div
        className="carousel-inner"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <button className="left-arrow" onClick={prevSlide}>❮</button>
        <button className="right-arrow" onClick={nextSlide}>❯</button>
      </div>
    </div>
  );
};

export default Carousel;

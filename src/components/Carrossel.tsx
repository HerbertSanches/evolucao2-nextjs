import React, { useState, useEffect } from 'react';

const Slider = () => {
  // Array de imagens de exemplo
  const images = [
    'https://as1.ftcdn.net/v2/jpg/03/93/37/24/1000_F_393372407_u34qDqrJuvMZICQC0oKnKgEUi8XqVPJG.jpg',
    'https://marketingpordados.com/wp-content/uploads/2021/07/O-que-e-dashboard.jpg',
    'https://img.freepik.com/vetores-gratis/painel-de-negocios-do-painel-do-usuario_23-2148358960.jpg?w=996&t=st=1728911326~exp=1728911926~hmac=ea80cc17bcec4ab0a35cd6e96fcb5e73d0e856e51a3d17b6651722eec50a16c9',
    'https://th.bing.com/th/id/OIG2.ZIEkIEOANZuFMgzXDFI9?pid=ImgGn',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index:number) => {
    setCurrentIndex(index);
  };

  // Passagem automática dos slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); 

    return () => {
      clearInterval(interval); 
    };
  }, [currentIndex]);

  return (
    <div className="w-full h-full max-w-4xl mx-auto mr-1 text-center relative group">
      <div className="relative h-full">
        {/* Botão para o slide anterior */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          &#10094;
        </button>

        {/* Slide atual */}
        <div className="w-full h-full">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
        

        {/* Botão para o próximo slide */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          &#10095;
        </button>
      </div>

      {/* Indicadores de navegação (bolinhas) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full ${
                currentIndex === index
                  ? 'bg-white'
                  : 'bg-gray-400 hover:bg-gray-600'
              } focus:outline-none transition-colors duration-300`}
            />
          ))}
        </div>
    </div>
  );
};

export default Slider;

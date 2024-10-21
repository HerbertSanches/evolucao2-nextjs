import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import imgTest from '../../public/assets/images/aaaaaa.jpg'

const Carrossel = () => {
  const images = [
    'https://i.pinimg.com/originals/96/ff/ef/96ffef1d1a805b3a9a7e985100894fa3.jpg',
    'https://th.bing.com/th/id/OIG2.DqhYI1nYyMAW8BnSxY12?pid=ImgGn',
    'https://files.oaiusercontent.com/file-Tksr6lz7VinHVty2A23vl3Um?se=2024-10-14T16%3A45%3A18Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Da9b17d31-0e7b-4f6e-925f-b7ba16324fcb.webp&sig=kqQheE%2B%2BH48m8d8Zd5EHFZfy3yGEbJJfdnKwElgOOPY%3D',
    'https://files.oaiusercontent.com/file-8E8w1uDFKTUV9O2TXoKZsvAX?se=2024-10-14T16%3A17%3A01Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Db75186b3-6583-424b-82ff-69424b81255d.webp&sig=I5JGx6JOOqT03abaKz96TZyj89e8sTJ0fHpufI0DFts%3D',
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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 539000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <div className="relative w-full h-full overflow-hidden">
     
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full bg-custom-img bg-no-repeat bg-center bg-cover"

        // src={imgTest}
        // alt=''
        // className="w-full h-full bg-custom-img bg-no-repeat bg-center bg-cover"
      />

    

      {/* Botão para o slide anterior */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      >
        &#10094;
      </button>

      {/* Botão para o próximo slide */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      >
        &#10095;
      </button>

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

export default Carrossel;

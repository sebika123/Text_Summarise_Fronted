
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './Carousel.css';
import image1 from './images.png';
import image2 from './images1.jpg';
import image3 from './images2.jpg';

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const images = [image1, image2, image3];
  console.log('images array:', images);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const carouselProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <animated.div style={carouselProps} className="carousel">
      <img src={images[index]} alt={`Slide ${index + 1}`} />
    </animated.div>
  );
};

export default Carousel;

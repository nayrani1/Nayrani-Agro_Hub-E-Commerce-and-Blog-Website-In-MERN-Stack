import "../css/backToTop.css";
// ScrollToTopButton.js
import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 500); // Show the button when scrolled down by 100 pixels
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
      <FaArrowUp />
    </div>
  );
};

export default ScrollToTopButton;

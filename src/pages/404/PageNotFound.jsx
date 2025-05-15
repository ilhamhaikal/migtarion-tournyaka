import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/pageNotFound.css';

const PageNotFound = () => {
  useEffect(() => {
    // Efek mengetik untuk pesan
    const text = "Halaman ini sedang dalam pengembangan...";
    const typingElement = document.getElementById('typing-text');
    let i = 0;
    
    const typeWriter = () => {
      if (i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    
    typeWriter();
    
    // Efek rotasi gear
    const gears = document.querySelectorAll('.gear');
    setInterval(() => {
      gears.forEach((gear) => {
        const currentRotation = parseInt(gear.getAttribute('data-rotation') || 0);
        const speed = parseInt(gear.getAttribute('data-speed') || 1);
        gear.setAttribute('data-rotation', currentRotation + speed);
        gear.style.transform = `rotate(${currentRotation + speed}deg)`;
      });
    }, 50);
  }, []);

  return (
    <div className="not-found-container">
      <div className="maintenance-animation">
        <div className="gear gear-big" data-rotation="0" data-speed="1">
          <i className="fas fa-cog"></i>
        </div>
        <div className="gear gear-small" data-rotation="0" data-speed="-2">
          <i className="fas fa-cog"></i>
        </div>
        <div className="gear gear-medium" data-rotation="0" data-speed="1.5">
          <i className="fas fa-cog"></i>
        </div>
      </div>

      <div className="text-container">
        <h1>404 - Halaman Dalam Pengembangan</h1>
        <div className="typing-container">
          <span id="typing-text"></span>
          <span className="cursor">|</span>
        </div>
        <p>Kami sedang bekerja keras untuk menyelesaikan halaman ini. Silakan kembali lagi nanti!</p>
        <Link to="/" className="back-home-button">
          <i className="fas fa-home"></i> Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
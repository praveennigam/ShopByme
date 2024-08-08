import React, { useEffect, useState } from "react";
import "./Header.css";
import { assets } from "../../assets/assets";

function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    assets.cc1,
    assets.cc2,
    assets.cc3,
    assets.cc4,
    assets.cc5,
    assets.cc6,
  ];

  useEffect(() => {
    // Add number highlighting to marquee text
    const elements = document.querySelectorAll(".marquee p");
    elements.forEach((element) => {
      element.innerHTML = element.textContent.replace(
        /(\d+)/g,
        '<span class="number">$1</span>'
      );
    });
  }, []);

  useEffect(() => {
    // Carousel image slider
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="header">
      {/* Marquee Text */}
      <div className="marquee">
        <p>
          Big Sale! Get a <b>50% off</b> with code <b>(VISA50C)</b> ! Guaranteed
          discount on Visa or credit card payments. Hurry up, sale ends in 2
          days!
        </p>
      </div>

      {/* Carousel */}
      <div className="carousel">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${
              currentIndex === index ? "active" : ""
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
    </div>
  );
}

export default Header;

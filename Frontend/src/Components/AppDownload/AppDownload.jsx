import React, { useEffect, useState } from "react";
import "./AppDownload.css";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    assets.c1,
    assets.c2,
    assets.c3,
    assets.c4,
    assets.c5,
    assets.c8,
    assets.c9,
    assets.c10,
    assets.c11,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="app-download" id="app-download">
      <div className="app-download-carousel">
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
      <div className="top-img">
        <img src={assets.tru} alt="" />
      </div>
    </div>
  );
};

export default AppDownload;

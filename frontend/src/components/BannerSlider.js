// src/components/BannerSlider.js

import React from 'react';
import Slider from 'react-slick';
import '../Design/bannerSlider.css'; // Optional: Create this CSS file for slider styling

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="banner-slider">
      <Slider {...settings}>
        <div>
          <img src="/Banners/banner.jpg" alt="Banner 1" className="banner-image" />
        </div>
        <div>
          <img src="/Banners/banner1.jpg" alt="Banner 2" className="banner-image" />
        </div>
      </Slider>
    </div>
  );
};

export default BannerSlider;

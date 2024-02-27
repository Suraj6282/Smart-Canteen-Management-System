import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import pic1 from "../../images/6024960.jpg"
import pic2 from "../../images/banner (1).png"
import pic3 from "../../images/food.png"
import pic4 from "../../images/colddrink.png"
import pic5 from "../../images/choclate.png"


const OneImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2 style={{ color: "#C6A969" }}>WoW Big Discounts and Offers</h2>
      <Slider {...settings}>
        <div>
          <img src={pic1} alt="Image 1" style={{ width: '100%', height: 250 }} />
        </div>
        <div>
          <img src={pic2} alt="Image 2" style={{ width: '100%', height: 250 }} />
        </div>
        <div>
          <img src={pic3} alt="Image 2" style={{ width: '100%', height: 250 }} />
        </div>
        <div>
          <img src={pic4} alt="Image 2" style={{ width: '100%', height: 250 }} />
        </div>
        <div>
          <img src={pic5} alt="Image 2" style={{ width: '100%', height: 250 }} />
        </div>
        
      </Slider>
    </div>
  );
};

export default OneImageSlider;

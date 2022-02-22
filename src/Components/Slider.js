import React from "react";
import Carousel from "react-material-ui-carousel";

const Slider = () => {
  return (
    <Carousel
      className="carouselStyles mb-5 container-fluid m-auto"
      navButtonsAlwaysVisible="true"
    >
      <img
        src="https://www.modernfellows.com/wp-content/uploads/2020/10/Best-mens-online-clothing-stores.jpg"
        className="CarouselImage img-fluid"
        alt="slider"
      />
      <img
        src="https://ecommerce.ccc2020.fr/wp-content/uploads/2020/10/electronic-gadgets.jpeg"
        className="CarouselImage img-fluid"
        alt="slider"
      />
    </Carousel>
  );
};

export default Slider;

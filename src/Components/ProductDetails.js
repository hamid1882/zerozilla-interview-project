import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Rating } from "@material-ui/lab";
import Cart from "../Images/cart.png";
import Added from "../Images/added.png";

import Loader from "./Loader";

const ProductDetails = ({ cartCount, setCartCount }) => {
  const [productDetails, getProductDetails] = useState([]);
  const [rate, setRate] = useState(0);
  const [loader, setLoader] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const params = useParams();

  const URL = `https://fakestoreapi.com/products/${params.id}`;

  const handleProductDetails = () => {
    axios
      .get(URL)
      .then(function (response) {
        setLoader(true);
        getProductDetails(response.data);
        setRate(response.data.rating.rate);
        setLoader(false);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  };

  useEffect(
    () => {
      handleProductDetails();
    },

    // eslint-disable-next-line
    []
  );

  const options = {
    value: rate,
    readOnly: true,
    precision: 0.5,
  };

  const handleCartCount = () => {
    setIsAddedToCart(true);
    setCartCount(cartCount + 1);
  };

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="container mx-auto my-5 row align-items-center text-center text-dark text-decoration-none">
          <img
            className="my-3 mx-auto"
            style={{ height: "450px", width: "450px" }}
            src={productDetails.image}
            alt={`PRODUCt${productDetails.id}`}
          />
          <h2>{productDetails.title}</h2>
          <div className="d-flex gap-3 justify-content-center align-items-center">
            <h1>₹{productDetails.price}</h1>
            <Rating {...options} />
          </div>
          {isAddedToCart ? (
            <button
              disabled
              className="btn btn-secondary my-3 d-flex gap-3 justify-content-center align-items-center"
            >
              <img
                src={Added}
                alt="cart"
                style={{ height: "25px", width: "25px" }}
              />
              <span style={{ textWeitht: "500" }}>Added to Cart</span>
            </button>
          ) : (
            <button
              onClick={handleCartCount}
              className="btn btn-success my-3 d-flex gap-3 justify-content-center align-items-center"
            >
              <img
                src={Cart}
                alt="cart"
                style={{ height: "25px", width: "25px" }}
              />
              <span style={{ textWeitht: "500" }}>Add to Cart</span>
            </button>
          )}
          <p>{productDetails.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

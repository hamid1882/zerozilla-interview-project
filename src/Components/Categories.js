import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader.js";
import { Link } from "react-router-dom";

const Categories = () => {
  const [category, setCategory] = useState([]);
  const [loader, setLoader] = useState(false);

  const URL = "https://fakestoreapi.com/products/categories";

  const handleData = () => {
    axios
      .get(URL)
      .then(function (response) {
        setLoader(true);
        setCategory(response.data);
        setLoader(false);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  };
  useEffect(() => {
    handleData();
  }, []);

  const images = [
    {
      url: "https://ecommerce.ccc2020.fr/wp-content/uploads/2020/10/electronic-gadgets.jpeg",
    },
    {
      url: "https://images.naptol.com/usr/local/csp/staticContent/product_images/horizontal/750x750/Shubh-Muhurat-Jewellery-Collection-01.jpg",
    },
    {
      url: "https://www.modernfellows.com/wp-content/uploads/2020/10/Best-mens-online-clothing-stores.jpg",
    },
    {
      url: "https://i.etsystatic.com/26801805/r/il/45030d/3385924749/il_340x270.3385924749_2kld.jpg",
    },
  ];

  return (
    <div className="container my-5 ">
      <h1 className="fw-1 my-4 p-1 text-center">High Range of Products</h1>
      {loader ? (
        <Loader />
      ) : (
        <div className="container m-auto text-center row gap-2 p-2">
          {category.map((products, idx) => (
            <Link
              to={`/products/category/${products}`}
              key={idx}
              className="product-hover col col-12 col-md-5 text-dark text-decoration-none row mx-auto my-5 align-items-center"
            >
              <img
                src={images[idx].url}
                alt="gadgets"
                className="my-2 img-fluid"
              />
              <h3 className="fw-1">{products.toUpperCase()}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;

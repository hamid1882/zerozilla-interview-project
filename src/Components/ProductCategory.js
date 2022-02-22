import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";

const ProductCategory = () => {
  const [product, setProduct] = useState([]);
  const [loader, setLoader] = useState(false);

  const params = useParams();

  const URL = `https://fakestoreapi.com/products/category/${params.category}`;

  const handleData = () => {
    axios
      .get(URL)
      .then(function (response) {
        setLoader(true);
        setProduct(response.data);
        setTimeout(() => {
          setLoader(false);
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  };
  useEffect(() => {
    handleData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-center fs-1 fw-1 p-2 my-4">
          {params.category.toUpperCase()}
        </h1>
        {loader ? (
          <Loader />
        ) : (
          <div className="container-fluid mx-auto my-5 text-center row ">
            {product.map((product, idx) => (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="col col-12 col-md-5 mx-auto my-5 row align-items-center product-category-hover text-dark text-decoration-none"
              >
                <img
                  className="my-3 mx-auto"
                  style={{ height: "250px", width: "250px" }}
                  src={product.image}
                  alt={product.id}
                />
                <h2>{product.title}</h2>
                <h1>₹{product.price}</h1>
                <p>{product.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;

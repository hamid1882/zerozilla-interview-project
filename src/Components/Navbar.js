import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cart from "../Images/cart.png";
import Profile from "../Images/profile.png";
import axios from "axios";
import Loader from "./Loader";

const Navbar = ({ cartCount }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);

  const URL = "https://fakestoreapi.com/products";

  const handleSearchValue = (e) => {
    setSearch(e.target.value);
  };

  const handleProductDetails = () => {
    axios
      .get(URL)
      .then(function (response) {
        setLoader(true);
        setProducts(response.data);
        setTimeout(() => {
          setLoader(false);
        }, 1500);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const filteredData = products.filter((item) => {
    if (
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.id === parseInt(search)
    ) {
      return item;
    } else {
      return null;
    }
  });

  const navigate = useNavigate();
  const params = useParams();

  const handleNavigate = () => {
    setSearch("");
    navigate(params.id);
  };

  useEffect(() => {
    handleProductDetails();
  }, []);

  return (
    <>
      <div className="d-flex container-fluid h-25 justify-content-between align-items-center">
        <Link to="/" className="d-none d-md-block">
          <img
            className="col col-3 rounded-circle my-2"
            style={{ height: "100px", width: "100px" }}
            src="https://www.openbusinesscouncil.org/wp-content/uploads/2020/07/e-commerce-definizione-cos-e.jpg"
            alt="logo"
          />
        </Link>
        <Link to="/" className="d-md-none">
          <img
            className="col col-3 rounded-circle my-2"
            style={{ height: "50px", width: "50px" }}
            src="https://www.openbusinesscouncil.org/wp-content/uploads/2020/07/e-commerce-definizione-cos-e.jpg"
            alt="logo"
          />
        </Link>
        <div className="col col-8 d-none d-md-block border p-2 rounded shadow mx-2 d-flex align-items-center">
          <img
            style={{ height: "20px", width: "20px" }}
            className="mx-1 col col-3"
            src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/000000/external-search-ui-dreamstale-lineal-dreamstale.png"
            alt="search icon"
          />
          <input
            className="border-0 search p-2 col col-11"
            type="search"
            placeholder="Search"
            onChange={handleSearchValue}
          />
        </div>

        <div className="col col-4 col-md-2 d-flex justify-content-center align-items-center gap-1 gap-md-3">
          <Link to="/cart" className="text-decoration-none text-dark ">
            <img
              src={Cart}
              alt="cart"
              style={{ height: "35px", width: "35px" }}
            />
            <span className="batch">{cartCount}</span>
          </Link>
          <Link to="/profile" className="text-decoration-none">
            <img
              src={Profile}
              alt="Profile"
              style={{ height: "35px", width: "35px" }}
            />
          </Link>
        </div>
      </div>
      <div className="container mx-auto d-md-none p-2 rounded shadow mx-2 my-5 d-flex align-items-center w-75">
        <img
          style={{ height: "20px", width: "20px" }}
          className="mx-1"
          src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/000000/external-search-ui-dreamstale-lineal-dreamstale.png"
          alt="search icon"
        />
        <input
          className="border-0 w-100 search p-2"
          type="search"
          placeholder="Search"
          onChange={handleSearchValue}
        />
      </div>
      {search.length > 0 && (
        <div className="container-fluid mx-auto shadow">
          {loader ? (
            <Loader />
          ) : (
            <>
              {filteredData.map((items) => (
                <Link
                  to={`/products/${items.id}`}
                  className="text-dark text-decoration-none"
                  key={items.id}
                >
                  <div
                    className="d-flex align-items-center gap-4 search-product p-2 container rounded my-2"
                    onClick={handleNavigate}
                  >
                    <img
                      style={{ height: "65px", width: "65px" }}
                      src={items.image}
                      alt={items.title}
                    />
                    <h2>{items.title}</h2>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;

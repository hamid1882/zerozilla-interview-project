import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./Components/Categories.js";
import Navbar from "./Components/Navbar.js";
import Slider from "./Components/Slider.js";
import ProductCategory from "./Components/ProductCategory";
import "./App.css";
import ProductDetails from "./Components/ProductDetails.js";
import Cart from "./Components/Cart.js";
import Profile from "./Components/Profile.js";
import Footer from "./Components/Footer.js";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Navbar cartCount={cartCount} search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Slider />}></Route>
      </Routes>
      <Routes>
        <Route path="/" element={<Categories />}></Route>
      </Routes>
      <Routes>
        <Route
          path="/products/category/:category"
          element={<ProductCategory />}
        ></Route>
      </Routes>
      <Routes>
        <Route
          path="/products/:id"
          element={
            <ProductDetails
              cartCount={cartCount}
              setCartCount={setCartCount}
              search={search}
            />
          }
        ></Route>
      </Routes>
      <Routes>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
      <Routes>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

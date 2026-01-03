import { Routes, Route } from "react-router-dom";
import { Component } from "react";
import { Carousel } from 'react-responsive-carousel';
import Header from "./component/Header";
import ProductCard from "./component/ProductCard";
import ProductDetails from "./component/ProductDetails";
import Home from "./component/Home";
import Footer from "./component/Footer";
import Cart from "./component/Cart";
import User from "./component/User";
import Login from "./component/Login";
import Register from "./component/Register";
import product from "./Data/productData";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home product={product} />} />
        <Route path="/product" element={<ProductCard product={product} />} />
        <Route path="/product/:id" element={<ProductDetails product={product} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;

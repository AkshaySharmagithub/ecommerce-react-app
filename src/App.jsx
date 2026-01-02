import { Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import ProductCard from "./component/ProductCard";
import ProductDetails from "./component/ProductDetails";
import Home from "./component/Home";
import Footer from "./component/Footer";
import Cart from "./component/Cart";
import User from "./component/User";
import Login from "./component/Login";
import Register from "./component/Register";




function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductCard />} />
        <Route path="/product/:id" element={<ProductDetails />} />
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

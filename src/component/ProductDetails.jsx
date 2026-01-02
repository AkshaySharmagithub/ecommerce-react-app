import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => toast.error("Failed to load product"));
  }, [id]);

  const addToCart = () => {
    let cart = [];

    try {
      const stored = localStorage.getItem("cart");
      cart = stored ? JSON.parse(stored) : [];
    } catch {
      cart = [];
      localStorage.removeItem("cart");
    }

    const index = cart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      cart[index].qty += 1;
      setQuantity(cart[index].qty);
      toast.success("Quantity increased");
    } else {
      cart.push({ ...product, qty: 1 });
      setQuantity(1); 
      toast.success("Product added to cart ");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const goToCategory = () => {
    if (!product?.category) return;
    navigate(`/category/${product.category}`);
  };

  if (!product) return <h2 style={{ padding: "40px" }}>Loading...</h2>;

  return (
    <div style={{ padding: "40px", display: "flex", gap: "40px" }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "300px", height: "300px", objectFit: "contain" }}
      />

      <div>
        <h1>{product.title}</h1>
        <h2>₹ {product.price}</h2>
        <p>{product.description}</p>

        <p>
          <b>Category:</b> {product.category}
        </p>

        {quantity > 0 && (
          <p style={{ marginTop: "10px", fontWeight: "600" }}>
            Quantity in Cart: <span style={{ color: "#652646" }}>{quantity}</span>
          </p>
        )}

        <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
          <button
            onClick={addToCart}
            style={{
              padding: "10px 20px",
              background: "#652646",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>

          <button
            onClick={goToCategory}
            style={{
              padding: "10px 20px",
              background: "#111827",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            View Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

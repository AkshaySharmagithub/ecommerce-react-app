import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ProductDetails = ({ product: productData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (!id || !productData) return;

  
    const foundProduct = productData.find((p) => p.id === parseInt(id));
    if (foundProduct) setProduct(foundProduct);
  }, [id, productData]);

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

  const renderStars = (rating) => {
    const filled = Math.round(parseFloat(rating) || 0);
    return (
        <div style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
            {[...Array(10)].map((_, i) => (
                <span key={i} style={{ color: i < filled ? "#fbbf24" : "#e5e7eb", fontSize: "20px" }}>★</span>
            ))}
            <span style={{ fontSize: "16px", color: "#888", marginLeft: "8px" }}>{rating} / 10</span>
        </div>
    );
  };

  if (!product) return <h2 style={{ padding: "40px" }}>Loading...</h2>;

  return (
    <div style={{ padding: "40px", display: "flex", gap: "40px" }}>
      <img
        src={product.images && product.images.length > 0 ? product.images[0] : ""}
        alt={product.product_name}
        style={{ width: "300px", height: "300px", objectFit: "contain" }}
      />

      <div>
        <h1>{product.product_name}</h1>
        {renderStars(product.rating)}
        <h2>₹ {product.discount_price} <span style={{fontSize: "16px", textDecoration: "line-through", color: "#888"}}>₹{product.price}</span></h2>
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

import { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      setCart(stored ? JSON.parse(stored) : []);
    } catch {
      setCart([]);
      localStorage.removeItem("cart");
    }
  }, []);


  if (cart.length === 0) {
    return (
      <div style={emptyStyle}>
        <h2>🛒 Cart is empty</h2>
        <p>Add some products to see them here.</p>
      </div>
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + (item.discount_price || item.price) * item.qty,
    0
  );


  const removeOne = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id
          ? { ...item, qty: item.qty - 1 }
          : item
      )
      .filter((item) => item.qty > 0);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const addOne = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "20px" }}>🛒 Your Cart</h2>

      {cart.map((item) => (
        <div key={item.id} style={itemRow}>
          {/* LEFT */}
          <div style={leftStyle}>
            <img
              src={item.images ? item.images[0] : item.image}
              alt={item.product_name || item.title}
              style={imgStyle}
            />

            <div>
              <h4>{item.product_name || item.title}</h4>
              <p>₹ {item.discount_price || item.price}</p>
              
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                <button onClick={() => removeOne(item.id)} style={qtyBtnStyle}>-</button>
                <span style={{ fontWeight: "bold" }}>{item.qty}</span>
                <button onClick={() => addOne(item.id)} style={qtyBtnStyle}>+</button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <h3 style={{ marginTop: "20px" }}>
        Total: ₹ {total.toFixed(2)}
      </h3>
    </div>
  );
};


const containerStyle = {
  maxWidth: "1200px",
  margin: "auto",
  padding: "24px",
  minHeight: "60vh",
};

const itemRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "16px",
  padding: "16px 0",
  borderBottom: "1px solid #e5e7eb",
};

const leftStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap",
};

const imgStyle = {
  width: "90px",
  height: "90px",
  objectFit: "contain",
};

const qtyBtnStyle = {
  padding: "5px 12px",
  background: "#f3f4f6",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
};

const emptyStyle = {
  minHeight: "60vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

export default Cart;

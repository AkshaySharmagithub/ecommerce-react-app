import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState("desktop");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;

      if (w <= 768) setScreen("mobile");
      else if (w <= 1024) setScreen("tablet");
      else setScreen("desktop");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobileLike = screen !== "desktop"; // mobile + tablet

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/product?search=${search}`);
    setOpen(false);
  };

  return (
    <header style={headerStyle}>
      <div style={topBarStyle}>




        <NavLink to="/" style={{ textDecoration: "none" }}>
          <h2 style={{ letterSpacing: "4px", fontWeight: "bold", fontSize: "20px"}}>
            <span style={{ color: "#ef19af" }}>Shop</span>
            <span style={{ color: "#d0219e" }}>Now</span>
          </h2>
        </NavLink>

    
        {screen === "desktop" && (
          <form onSubmit={handleSearch} style={{ width: "40%" }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
              style={searchStyle}
            />
          </form>
        )}

      
        {screen === "desktop" && (
          <nav style={{ display: "flex", gap: "30px" }}>
            <NavLink style={linkStyle} to="/">Home</NavLink>
            <NavLink style={linkStyle} to="/product">Products</NavLink>
            <NavLink style={linkStyle} to="/cart">Cart</NavLink>
            <NavLink style={linkStyle} to="/user">User</NavLink>
            <NavLink style={linkStyle} to="/login">Login</NavLink>
            <NavLink style={linkStyle} to="/register">Register</NavLink>
          </nav>
        )}

    
        {isMobileLike && (
          <button onClick={() => setOpen(!open)} style={menuBtnStyle}>
            ☰
          </button>
        )}
      </div>

    
      {open && isMobileLike && (
        <div style={mobileMenuStyle}>
          <form onSubmit={handleSearch}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
              style={searchStyle}
            />
          </form>

          <NavLink onClick={() => setOpen(false)} style={linkStyle} to="/">Home</NavLink>
          <NavLink onClick={() => setOpen(false)} style={linkStyle} to="/product">Products</NavLink>
          <NavLink onClick={() => setOpen(false)} style={linkStyle} to="/cart">Cart</NavLink>
          <NavLink onClick={() => setOpen(false)} style={linkStyle} to="/user">User</NavLink>
          <NavLink onClick={() => setOpen(false)} style={linkStyle} to="/login">Login</NavLink>
          <NavLink onClick={() => setOpen(false)} style={linkStyle} to="/register">Register</NavLink>


          

        </div>
      )}
    </header>
  );
};



const headerStyle = {
  position: "sticky",
  top: 0,
  zIndex: 100,
  background: "white",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const topBarStyle = {
  maxWidth: "1200px",
  margin: "auto",
  padding: "14px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const mobileMenuStyle = {
  padding: "16px 24px",
  borderTop: "1px solid #eee",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const menuBtnStyle = {
  fontSize: "26px",
  background: "none",
  border: "none",
  cursor: "pointer",
};

const linkStyle = {
  textDecoration: "none",
  color: "#333",
  fontWeight: "500",
};

const searchStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "14px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

export default Header;

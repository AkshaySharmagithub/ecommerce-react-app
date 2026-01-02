import { NavLink } from "react-router-dom";
import ProductCard from "./ProductCard";
const Home = () => {
  return (
    <div>

      <section
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1607082350899-7e105aa886ae')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.85)",
            padding: "60px",
            borderRadius: "12px",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          <h1 style={{ fontSize: "40px", marginBottom: "16px" }}>
            Welcome to <span style={{ color: "#ec4899" }}>Ecommerce App</span>
          </h1>

          <p style={{ fontSize: "18px", color: "#555", marginBottom: "30px" }}>
            Discover trendy products, best prices and smooth shopping
            experience.
          </p>

          <NavLink
            to="/product"
            style={{
              background: "#ec4899",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Explore Products →
          </NavLink>
        </div>
      </section>

  
  <section className="py-14 px-4 bg-white">
  <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
    Why Shop With Us?
  </h2>

  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    
    
    <div className="
      bg-white rounded-xl p-6 text-center
      shadow transition-all duration-300
      hover:shadow-xl hover:-translate-y-2
      cursor-pointer
    ">
      <h3 className="font-semibold text-lg">
        Fast Delivery
      </h3>
      <p className="text-gray-600 text-sm">
        Quick & reliable shipping
      </p>
    </div>

  
    <div className="
      bg-white rounded-xl p-6 text-center
      shadow transition-all duration-300
      hover:shadow-xl hover:-translate-y-2
      cursor-pointer
    ">
      <h3 className="font-semibold text-lg">
      Secure Payment
      </h3>
      <p className="text-gray-600 text-sm">
        100% safe transactions
      </p>
    </div>

    <div className="
      bg-white rounded-xl p-6 text-center
      shadow transition-all duration-300
      hover:shadow-xl hover:-translate-y-2
      cursor-pointer
    ">
      <h3 className="font-semibold text-lg">
      Best Quality
      </h3>
      <p className="text-gray-600 text-sm">
        Top-rated products
      </p>
    </div>

  </div>
</section>

      <section>
        <h1 style={{ fontSize: "28px", marginBottom: "20px", textAlign:"center" }}>Products</h1>
        <ProductCard showSidebar={false} />
      </section>
    </div>
  );
};

const cardStyle = {
  background: "#f9fafb",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
};

export default Home;

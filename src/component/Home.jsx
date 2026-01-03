import { NavLink } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect } from "react";

const Home = ({ product = [] }) => {
  const electronics = product.filter(p => p.category === 'Electronics');
  const fashion = product.filter(p => p.category === 'Fashion');
  const footwear = product.filter(p => p.category === 'Footwear');
  

  const [slidePercentage, setSlidePercentage] = useState(33.33);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSlidePercentage(100);
      } else if (width < 1024) {
        setSlidePercentage(50);
      } else {
        setSlidePercentage(25);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderStars = (rating) => {
    const filled = Math.round(parseFloat(rating) || 0);
    if (!rating) return null;
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: 'center', margin: "8px 0", gap: '2px' }}>
            {[...Array(10)].map((_, i) => (
                <span key={i} style={{ color: i < filled ? "#fbbf24" : "#e5e7eb", fontSize: "14px" }}>★</span>
            ))}
            <span style={{ fontSize: "12px", color: "#888", marginLeft: "5px" }}>{rating}</span>
        </div>
    );
  };

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
            padding: "40px",
            borderRadius: "12px",
            textAlign: "center",
            maxWidth: "600px",
            margin: "20px"
          }}
        >
          <h1 style={{ fontSize: "40px", marginBottom: "16px" }}>
            Welcome to <span style={{ color: "#ec4899" }}>ShopNow</span>
          </h1>
          <p style={{ fontSize: "18px", color: "#555", marginBottom: "30px" }}>
            Discover trendy products, best prices and smooth shopping experience.
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
      
      
      <div style={{ background: "#232f3e", color: "white", padding: "10px 0" }}>
        <marquee behavior="scroll" direction="left" style={{ fontSize: "14px", fontWeight: "500" }}>
          ⚡ Deals of the Day: Up to 70% off on Electronics & Fashion! | 🚚 Free Shipping on Your First Order | 💳 Secure Payments & Easy Returns
        </marquee>
      </div>
      
      {electronics.length > 0 && (
        <section style={{ padding: "50px 0", background: "#f9fafb" }}>
          <h2 style={{ fontSize: "30px", textAlign: "center", marginBottom: "40px", fontWeight: "600" }}>
            Deals on Electronics
          </h2>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              showIndicators={false}
              autoPlay={true}
              interval={3000}
              showArrows={true}
              centerMode
              centerSlidePercentage={slidePercentage}
              emulateTouch
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, left: 15 }}>
                    &#x276E;
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: 15 }}>
                    &#x276F;
                  </button>
                )
              }
            >
              {electronics.map((item) => (
                <div style={{ padding: "0 15px" }} key={item.id}>
                  <NavLink 
                    to={`/product/${item.id}`} 
                    style={{ textDecoration: "none", color: "inherit", display: 'block' }}
                  >
                    <div style={{ 
                      background: "white", 
                      padding: "20px", 
                      borderRadius: "12px", 
                      boxShadow: "0 4px 10px rgba(0,0,0,0.08)", 
                      border: "1px solid #e0e0e0",
                      margin: "0 5px"
                    }}>
                      <img 
                        src={item.images[0]}
                        alt={item.product_name} 
                        style={{ width: "100%", height: "220px", objectFit: "contain", marginBottom: "15px" }} 
                      />
                      <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "5px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{item.product_name}</h3>
                      {renderStars(item.rating)}
                      <p style={{ color: "#ec4899", fontWeight: "bold", fontSize: "18px" }}>₹ {item.discount_price}</p>
                    </div>
                  </NavLink>
                </div>
              ))}
            </Carousel>
          </div>
        </section>
      )}

    
      {fashion.length > 0 && (
        <section style={{ padding: "50px 0", background: "#ffffff" }}>
          <h2 style={{ fontSize: "30px", textAlign: "center", marginBottom: "40px", fontWeight: "600" }}>
            Latest in Fashion
          </h2>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              showIndicators={false}
              autoPlay={true}
              interval={3000}
              showArrows={true}
              centerMode
              centerSlidePercentage={slidePercentage}
              emulateTouch
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, left: 15 }}>
                    &#x276E;
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: 15 }}>
                    &#x276F;
                  </button>
                )
              }
            >
              {fashion.map((item) => (
                <div style={{ padding: "0 15px" }} key={item.id}>
                  <NavLink to={`/product/${item.id}`} style={{ textDecoration: "none", color: "inherit", display: 'block' }}>
                    <div style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.08)", border: "1px solid #e0e0e0", margin: "0 5px" }}>
                      <img src={item.images[0]} alt={item.product_name} style={{ width: "100%", height: "220px", objectFit: "contain", marginBottom: "15px" }} />
                      {renderStars(item.rating)}
                      <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "5px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{item.product_name}</h3>
                      <p style={{ color: "#ec4899", fontWeight: "bold", fontSize: "18px" }}>₹ {item.discount_price}</p>
                    </div>
                  </NavLink>
                </div>
              ))}
            </Carousel>
          </div>
        </section>
      )}

      {footwear.length > 0 && (
        <section style={{ padding: "50px 0", background: "#f9fafb" }}>
          <h2 style={{ fontSize: "30px", textAlign: "center", marginBottom: "40px", fontWeight: "600" }}>
            Top Picks in Footwear
          </h2>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
            <Carousel 
              showThumbs={false} 
              showStatus={false} 
              infiniteLoop 
              showIndicators={false}
              autoPlay={true}
              interval={3000}
              showArrows={true} 
              centerMode 
              centerSlidePercentage={slidePercentage} 
              emulateTouch
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, left: 15 }}>
                    &#x276E;
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: 15 }}>
                    &#x276F;
                  </button>
                )
              }
            >
              {footwear.map((item) => (
                <div style={{ padding: "0 15px" }} key={item.id}>
                  <NavLink to={`/product/${item.id}`} style={{ textDecoration: "none", color: "inherit", display: 'block' }}>
                    <div style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.08)", border: "1px solid #e0e0e0", margin: "0 5px" }}>
                      <img 
                        src={item.images[0]} 
                        alt={item.product_name} 
                        style={{ width: "100%", height: "220px", objectFit: "contain", marginBottom: "15px" }} 
                      />
                      <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "5px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{item.product_name}</h3>
                      {renderStars(item.rating)}
                      <p style={{ color: "#ec4899", fontWeight: "bold", fontSize: "18px" }}>₹ {item.discount_price}</p>
                    </div>
                  </NavLink>
                </div>
              ))}
            </Carousel>
          </div>
        </section>
      )}

      <section style={{ padding: "50px 20px", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", borderRadius: "12px", overflow: "hidden" }}>
          <NavLink to="/product">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop" 
              alt="Running Shoes Banner" style={{ width: "100%", display: "block", maxHeight: "400px", objectFit: "cover" }} />
          </NavLink>
        </div>
      </section>

  
      <section style={{ padding: "50px 20px", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "300px", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <NavLink to="/product">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" alt="Fashion Banner" style={{ width: "100%", display: "block", height: "250px", objectFit: "cover" }} />
            </NavLink>
          </div>
          <div style={{ flex: 1, minWidth: "300px", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <NavLink to="/product">
              <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2001&auto=format&fit=crop" alt="Electronics Banner" style={{ width: "100%", display: "block", height: "250px", objectFit: "cover" }} />
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

const arrowStyles = {
  position: 'absolute',
  zIndex: 2,
  top: 'calc(50% - 20px)',
  width: 40,
  height: 40,
  cursor: 'pointer',
  background: '#ec4899',
  borderRadius: '50%',
  border: 'none',
  color: 'white',
  fontSize: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default Home;

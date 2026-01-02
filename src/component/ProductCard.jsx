import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProductCard = ({ showSidebar = true }) => {
const [products, setProducts] = useState([]);
const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("All");
const [loading, setLoading] = useState(true);
const navigate = useNavigate();
const [searchParams] = useSearchParams();
const searchQuery = searchParams.get("search") || "";

useEffect(() => {
    const fetchData = async () => {
    try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
        axios.get("https://fakestoreapi.com/products"),
        axios.get("https://fakestoreapi.com/products/categories"),
        ]);

        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
    } catch (error) {
        console.error(error);
        toast.error("Error fetching data");
    } finally {
        setLoading(false);

    }
    };

    fetchData();
}, []);


const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
});

if (loading) {
    return (
    <div style={{ textAlign: "center", padding: "50px", fontSize: "20px" }}>
        Loading products...
    </div>
    );
}

return (
    <div style={containerStyle}>
    {searchQuery && (
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Results for "{searchQuery}"
        </h2>
    )}
    
    <div style={layoutStyle}>
    
    
        {showSidebar && (
        <aside style={sidebarStyle}>
            <h3 style={{ marginBottom: "15px", paddingBottom: "10px", borderBottom: "1px solid #eee" }}>
            Categories
            </h3>


            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label style={radioLabelStyle}>
                <input
                type="radio"
                name="category"
                checked={selectedCategory === "All"}
                onChange={() => setSelectedCategory("All")}
                style={{ marginRight: "10px", accentColor: "#ec4899", cursor: "pointer" }}
                />
                All Products
            </label>
            {categories.map((cat) => (
                <label key={cat} style={radioLabelStyle}>
                <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    style={{ marginRight: "10px", accentColor: "#726a6eff", cursor: "pointer" }}
                />
                {cat}
                </label>
            ))}
            </div>
        </aside>
        )}

    
        <div style={{ flex: 1 }}>
        <div style={gridStyle}>
            {filteredProducts.map((product) => (
            
            <div
                key={product.id}
                style={cardStyle}
                onClick={() => navigate(`/product/${product.id}`)}
            >
                <img
                src={product.image}
                alt={product.title}
                style={imageStyle}
                />
                <div style={infoStyle}>
                <h3 style={titleStyle}>{product.title}</h3>
                <p style={categoryStyle}>{product.category}</p>
                <div style={footerStyle}>
                    <span style={priceStyle}>₹ {product.price}</span>
                    <button style={btnStyle}>View</button>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    </div>
    
    {filteredProducts.length === 0 && (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#666" }}>
        No products found.
        </p>
    )}
    </div>
);
};


const containerStyle = {
maxWidth: "1200px",
margin: "0 auto",
padding: "20px",
};

const layoutStyle = {
display: "flex",
gap: "30px",
flexWrap: "wrap",
};

const sidebarStyle = {
width: "250px",
flexShrink: 0,
background: "white",
padding: "20px",
borderRadius: "12px",
border: "1px solid #e5e7eb",
height: "fit-content",
};

const radioLabelStyle = {
display: "flex",
alignItems: "center",
cursor: "pointer",
textTransform: "capitalize",
color: "#555",
fontSize: "15px",
};

const gridStyle = {
display: "grid",
gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
gap: "30px",
};

const cardStyle = {
background: "white",
border: "1px solid #e5e7eb",
borderRadius: "12px",
padding: "20px",
cursor: "pointer",
transition: "all 0.3s ease",
display: "flex",
flexDirection: "column",
justifyContent: "space-between",
boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
};

const imageStyle = {
width: "100%",
height: "200px",
objectFit: "contain",
marginBottom: "15px",
};

const infoStyle = {
display: "flex",
flexDirection: "column",
gap: "8px",
};

const titleStyle = {
fontSize: "16px",
fontWeight: "600",
overflow: "hidden",
textOverflow: "ellipsis",
whiteSpace: "nowrap",
};

const categoryStyle = {
fontSize: "12px",
color: "#888",
textTransform: "capitalize",
};

const footerStyle = {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginTop: "10px",
};

const priceStyle = {
fontSize: "18px",
fontWeight: "bold",
color: "#ec4899",
};

const btnStyle = {
background: "#111827",
color: "white",
border: "none",
padding: "8px 16px",
borderRadius: "6px",
cursor: "pointer",
fontSize: "14px",
};

export default ProductCard;

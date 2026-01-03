import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ProductCard = ({ product: products = [], showSidebar = true }) => {
const [categories, setCategories] = useState([]);
const [subCategories, setSubCategories] = useState([]);
const [colors, setColors] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("All");
const [selectedSubCategory, setSelectedSubCategory] = useState("All");
const [selectedColor, setSelectedColor] = useState("All");
const [selectedPriceRange, setSelectedPriceRange] = useState("all");
const navigate = useNavigate();
const [searchParams] = useSearchParams();
const searchQuery = searchParams.get("search") || "";

useEffect(() => {
    if (products) {
        const uniqueCategories = [...new Set(products.map((p) => p.category).filter(Boolean))];
        setCategories(uniqueCategories);

        const uniqueColors = [...new Set(products.map((p) => p.color).filter(Boolean))];
        setColors(uniqueColors);
    }
}, [products]);


useEffect(() => {
    if (products) {
        const filtered = selectedCategory === "All"
            ? products
            : products.filter((p) => p.category === selectedCategory);
        
        const uniqueSub = [...new Set(filtered.map((p) => p.sub_category).filter(Boolean))];
        setSubCategories(uniqueSub);
        setSelectedSubCategory("All");
    }
}, [products, selectedCategory]);

const filteredProducts = products.filter((p) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = p.product_name.toLowerCase().includes(searchLower) || 
    (p.title && p.title.toLowerCase().includes(searchLower));
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSubCategory = selectedSubCategory === "All" || p.sub_category === selectedSubCategory;
    const matchesColor = selectedColor === "All" || (p.color && p.color.toLowerCase() === selectedColor.toLowerCase());
    
    let matchesPrice = true;
    const price = p.discount_price || p.price;
    if (selectedPriceRange === "0-1000") matchesPrice = price >= 0 && price <= 1000;
    else if (selectedPriceRange === "1000-10000") matchesPrice = price > 1000 && price <= 10000;
    else if (selectedPriceRange === "10000-50000") matchesPrice = price > 10000 && price <= 50000;
    else if (selectedPriceRange === "50000+") matchesPrice = price > 50000;

    return matchesSearch && matchesCategory && matchesSubCategory && matchesPrice && matchesColor;
}).sort((a, b) => {

    return (a.discount_price || a.price) - (b.discount_price || b.price);
});

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

            
            {subCategories.length > 0 && (
                <>
                    <h3 style={{ marginTop: "20px", marginBottom: "15px", paddingBottom: "10px", borderBottom: "1px solid #eee" }}>
                    Sub Categories
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <label style={radioLabelStyle}>
                        <input
                        type="radio"
                        name="subcategory"
                        checked={selectedSubCategory === "All"}
                        onChange={() => setSelectedSubCategory("All")}
                        style={{ marginRight: "10px", accentColor: "#ec4899", cursor: "pointer" }}
                        />
                        All
                    </label>
                    {subCategories.map((sub) => (
                        <label key={sub} style={radioLabelStyle}>
                        <input
                            type="radio"
                            name="subcategory"
                            checked={selectedSubCategory === sub}
                            onChange={() => setSelectedSubCategory(sub)}
                            style={{ marginRight: "10px", accentColor: "#726a6eff", cursor: "pointer" }}
                        />
                        {sub}
                        </label>
                    ))}
                    </div>
                </>
            )}

        
            {colors.length > 0 && (
                <>
                    <h3 style={{ marginTop: "20px", marginBottom: "15px", paddingBottom: "10px", borderBottom: "1px solid #eee" }}>
                    Colors
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    <div
                        onClick={() => setSelectedColor("All")}
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            background: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
                            cursor: "pointer",
                            border: selectedColor === "All" ? "2px solid #111827" : "1px solid #e5e7eb",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                            transform: selectedColor === "All" ? "scale(1.1)" : "scale(1)",
                            transition: "all 0.2s"
                        }}
                        title="All Colors"
                    />
                    {colors.map((color) => (
                        <div 
                            key={color} 
                            onClick={() => setSelectedColor(color)}
                            style={{ 
                                width: "30px", 
                                height: "30px", 
                                borderRadius: "50%", 
                                backgroundColor: color.toLowerCase() === 'titanium' ? '#878681' : color, 
                                cursor: "pointer",
                                border: selectedColor === color ? "2px solid #111827" : "1px solid #e5e7eb",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                transform: selectedColor === color ? "scale(1.1)" : "scale(1)",
                                transition: "all 0.2s"
                            }}
                            title={color}
                        />
                    ))}
                    </div>
                </>
            )}
        
            <h3 style={{ marginTop: "20px", marginBottom: "15px", paddingBottom: "10px", borderBottom: "1px solid #eee" }}>
            Filter by Price
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label style={radioLabelStyle}>
                    <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceRange === "all"}
                    onChange={() => setSelectedPriceRange("all")}
                    style={{ marginRight: "10px", accentColor: "#ec4899", cursor: "pointer" }}
                    />
                    All Prices
                </label>
                <label style={radioLabelStyle}>
                    <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceRange === "0-1000"}
                    onChange={() => setSelectedPriceRange("0-1000")}
                    style={{ marginRight: "10px", accentColor: "#ec4899", cursor: "pointer" }}
                    />
                    ₹0 - ₹1,000
                </label>
                <label style={radioLabelStyle}>
                    <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceRange === "1000-10000"}
                    onChange={() => setSelectedPriceRange("1000-10000")}
                    style={{ marginRight: "10px", accentColor: "#ec4899", cursor: "pointer" }}
                    />
                    ₹1,000 - ₹10,000
                </label>
                <label style={radioLabelStyle}>
                    <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceRange === "10000-50000"}
                    onChange={() => setSelectedPriceRange("10000-50000")}
                    style={{ marginRight: "10px", accentColor: "#ec4899", cursor: "pointer" }}
                    />
                    ₹10,000 - ₹50,000
                </label>
                <label style={radioLabelStyle}>
                    <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceRange === "50000+"}
                    onChange={() => setSelectedPriceRange("50000+")}
                    style={{ marginRight: "10px", accentColor: "#ec4899", cursor: "pointer" }}
                    />
                    Above ₹50,000
                </label>
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
                src={product.images && product.images.length > 0 ? product.images[0] : ""}
                alt={product.product_name}
                style={imageStyle}
                />
                <div style={infoStyle}>
                <h3 style={titleStyle}>{product.title || product.product_name}</h3>
                <p style={categoryStyle}>{product.category}</p>
                <div style={footerStyle}>
                    <div>
                        <span style={priceStyle}>₹ {product.discount_price}</span>
                        {product.price > product.discount_price && (
                            <span style={{ textDecoration: "line-through", color: "#9ca3af", fontSize: "13px", marginLeft: "8px" }}>₹{product.price}</span>
                        )}
                    </div>
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
width: "300px",
padding: "10px",
flexShrink: 0,
background: "white",
padding: "20px",
borderRadius: "12px",
border: "1px solid #e5e7eb",
minHeight: "100vh",
maxheight: "100vh",
overflowY: "auto",
boxShadow: "0 2px 5px rgba(0,0,0,0.05)",

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
position: "relative",
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

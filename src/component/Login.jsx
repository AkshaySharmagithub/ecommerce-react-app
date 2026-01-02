import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
    toast.error("All fields are required");
    return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
    (u) => u.email === email && u.password === password
    );

    if (!user) {
    toast.error("Invalid email or password");
    return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");

    toast.success(`Welcome ${user.name} `);
    navigate("/user");
};

return (
    <div style={container}>
    <div style={card}>
        <h2 style={title}>Login</h2>

        <form onSubmit={handleLogin} style={form}>
        <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
        />

        <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
        />

        <button style={button}>Login</button>
        </form>

        <p style={{ textAlign: "center" }}>
        New user? <NavLink to="/register">Register</NavLink>
        </p>
    </div>
    </div>
);
};

export default Login;

const container = {
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
background: "#fff5f8",
};

const card = {
width: "360px",
padding: "30px",
background: "#fff",
borderRadius: "12px",
boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
};

const title = {
textAlign: "center",
marginBottom: "20px",
};

const form = {
display: "flex",
flexDirection: "column",
gap: "16px",
};

const input = {
padding: "10px 14px",
borderRadius: "8px",
border: "1px solid #ddd",
};

const button = {
padding: "10px",
background: "#ec4899",
color: "white",
border: "none",
borderRadius: "8px",
cursor: "pointer",
};

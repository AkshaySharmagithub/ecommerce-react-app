import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
    toast.error("All fields are required");
    return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const already = users.find((u) => u.email === email);
    if (already) {
    toast.error("User already exists");
    return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Registration successful ");
    navigate("/login");
};

return (
    <div style={container}>
    <div style={card}>
        <h2 style={title}>Register</h2>

        <form onSubmit={handleRegister} style={form}>
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={input}
        />

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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
        />

        <button style={button}>Register</button>
        </form>

        <p style={{ textAlign: "center" }}>
        Already have account? <NavLink to="/login">Login</NavLink>
        </p>
    </div>
    </div>
);
};

export default Register;


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

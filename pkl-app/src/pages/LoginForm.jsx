import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      alert("Login sukses!");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert("Login gagal: " + err.response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input name="email" onChange={handleChange} placeholder="Email" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" />
        <button type="submit">Login</button>
      </form>

      {/* 🔗 Link ke halaman register */}
      <p>Belum punya akun? <Link to="/register">Daftar di sini</Link></p>
    </>
  );
}

export default LoginForm;
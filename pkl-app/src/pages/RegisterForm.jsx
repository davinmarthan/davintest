import { useState } from "react";
import axios from "axios";

function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/register", form);
      alert(res.data.message);
    } catch (err) {
      alert("Gagal Register: " + err.response.data.detail);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Name" />
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
import { useState, useEffect } from "react";
import api from "../services/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setEdit({
        name: storedUser.name,
        email: storedUser.email,
        password: storedUser.password,
      });
    }
  }, []);

  const handleChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await api.put(`/users/${user.id}`, edit);
      alert("Profil berhasil diupdate");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (err) {
      alert("Update gagal: " + err.response.data.detail);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Halo, {user.name} 👋</h2>
      <h3>Edit Profil:</h3>
      <input name="name" value={edit.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={edit.email} onChange={handleChange} placeholder="Email" />
      <input name="password" value={edit.password} onChange={handleChange} placeholder="Password" />
      <button onClick={handleUpdate}>Simpan Perubahan</button>
    </div>
  );
}

export default Dashboard;
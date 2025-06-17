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

  if (!user) return <p style={styles.loading}>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Halo, {user.name} 👋</h2>
        <h3 style={styles.subtitle}>Edit Profil:</h3>
        <input
          name="name"
          value={edit.name}
          onChange={handleChange}
          placeholder="Name"
          style={styles.input}
        />
        <input
          name="email"
          value={edit.email}
          onChange={handleChange}
          placeholder="Email"
          style={styles.input}
        />
        <input
          name="password"
          value={edit.password}
          onChange={handleChange}
          placeholder="Password"
          style={styles.input}
        />
        <button onClick={handleUpdate} style={styles.button}>
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    maxWidth: "500px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: "10px",
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#555",
  },
  input: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    background: "linear-gradient(to right, #007BFF, #00C6FF)",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  loading: {
    fontSize: "18px",
    textAlign: "center",
    marginTop: "50px",
    color: "#fff",
  },
};

export default Dashboard;

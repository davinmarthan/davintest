const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi ke PostgreSQL

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pkl_sarastya',
  password: '11367',
  port: 5432,
});


// Cek koneksi awal
pool.connect()
  .then(() => console.log("✅ Koneksi ke PostgreSQL berhasil"))
  .catch((err) => console.error("❌ Gagal koneksi ke PostgreSQL", err));

// Endpoint Register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    res.json({ message: "User registered", user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Register failed", detail: err.message });
  }
});

// Endpoint Login (basic)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );
    if (result.rows.length > 0) {
      res.json({ message: "Login sukses", user: result.rows[0] });
    } else {
      res.status(401).json({ message: "Email atau password salah" });
    }
  } catch (err) {
    res.status(500).json({ error: "Login error", detail: err.message });
  }
});

// ... kode sebelumnya

// LOGIN
app.post("/login", async (req, res) => {
    // isi login
  });
  
  // ✅ Tambahkan di bawahnya:
  app.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
      const result = await pool.query(
        "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
        [name, email, password, id]
      );
      res.json({ message: "Update sukses", user: result.rows[0] });
    } catch (err) {
      res.status(500).json({ error: "Gagal update", detail: err.message });
    }
  });

// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
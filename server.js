import express from "express";
import pool from "./db.js";  // Supabase PostgreSQL connection
import dotenv from "dotenv";

dotenv.config();

const app = express();

// 1️⃣ JSON parsing
app.use(express.json());

// CORS headers
const allowedOrigin = "https://teal-klepon-9a05ff.netlify.app";
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// POST route to insert complaints
app.post("/submit", async (req, res) => {
  const { first_name, last_name, email, phone, student_id, description } = req.body;

  try {
    const sql = `
      INSERT INTO complaints (first_name, last_name, email, phone, student_id, description)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [first_name, last_name, email, phone, student_id, description];

    const result = await pool.query(sql, values);

    res.send({ status: "success", message: "Complaint Submitted", data: result.rows[0] });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.send({ status: "error", error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

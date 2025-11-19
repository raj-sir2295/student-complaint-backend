import express from "express";
import sql from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// 1️⃣ JSON parsing
app.use(express.json());

// 2️⃣ ✅ OPTIONS preflight handle (CORS)
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://teal-klepon-9a05ff.netlify.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// 3️⃣ CORS headers for all other requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://teal-klepon-9a05ff.netlify.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// 4️⃣ POST route
app.post("/submit", async (req, res) => {
  try {
    const { first_name, last_name, email, phone, student_id, description } = req.body;

    await sql`
      INSERT INTO complaints (first_name, last_name, email, phone, student_id, description)
      VALUES (${first_name}, ${last_name}, ${email}, ${phone}, ${student_id}, ${description})
    `;

    res.send({ status: "success", message: "Complaint Submitted" });

  } catch (err) {
    console.error("DB ERROR:", err);
    res.send({ status: "error", error: err });
  }
});

// 5️⃣ Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

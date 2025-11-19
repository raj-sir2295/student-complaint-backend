import { neon } from "@netlify/neon";

const sql = neon(process.env.NETLIFY_DATABASE_URL);

// db.js
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL connection using Supabase details
const pool = new Pool({
  host: process.env.DB_HOST,      // db.vkxhvvviirjkfscuqxeh.supabase.co
  port: process.env.DB_PORT,      // 5432
  user: process.env.DB_USER,      // postgres
  password: process.env.DB_PASSWORD, // Supabase password
  database: process.env.DB_NAME,  // postgres
  ssl: { rejectUnauthorized: false } // Supabase requires SSL
});

export default pool;

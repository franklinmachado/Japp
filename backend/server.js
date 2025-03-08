require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Connected to the database");
});

app.get("/", (req, res) => {
  res.send("API rodando...");
});

app.listen(PORT, () => {
  console.log(`Server rodando na porta http://localhost:${PORT}`);
});

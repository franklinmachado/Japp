require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const pacienteRoutes = require("./routes/pacientes");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use("/api", pacienteRoutes);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados: " + err.stack);
    return;
  }
  console.log("Banco de dados conectado com ID: " + db.threadId);
});

app.get("/", (req, res) => {
  res.send("API rodando...");
});

app.listen(PORT, () => {
  console.log(`Server rodando na porta http://localhost:${PORT}`);
});

const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// rotas para listar todos pacientes
router.get("/pacientes", (req, res) => {
  const query = "SELECT * FROM pacientes";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao buscar o paciente" });
    }
    res.status(200).json(results);
  });
});

// rota para adicionar um novo paciente
router.post("/pacientes", (req, res) => {
  const { nome, cpf, data_nascimento, endereco, telefone, historico_medico } =
    req.body;

  const query = `INSERT INTO pacientes (nome, cpf, data_nascimento, endereco, telefone, historico_medico) VALUES (?,?,?,?,?,?)`;
  db.query(
    query,
    [nome, cpf, data_nascimento, endereco, telefone, historico_medico],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erro ao adicionar o paciente" });
      }
      res.status(201).json({
        message: "Paciente adicionado com sucesso",
        id: results.insertId,
      });
    }
  );
});

router.get("/pacientes/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM pacientes WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao buscar o paciente" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Paciente não encontrado" });
    }
    res.status(200).json(results[0]);
  });
});

router.put("/pacientes/:id", (req, res) => {
  const { id } = req.params;
  const { nome, cpf, data_nascimento, endereco, telefone, historico_medico } =
    req.body;

  const query = `UPDATE pacientes SET nome = ?, cpf = ?, data_nascimento = ?, endereco = ?, telefone = ?, historico_medico = ? WHERE id = ?`;
  db.query(
    query,
    [nome, cpf, data_nascimento, endereco, telefone, historico_medico, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Erro ao atualizar o paciente" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Paciente não encontrado" });
      }
      res.status(200).json({ message: "Paciente atualizado com sucesso" });
    }
  );
});

router.delete("/pacientes/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM pacientes WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao deletar o paciente" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Paciente não encontrado" });
    }
    res.status(200).json({ message: "Paciente deletado com sucesso" });
  });
});

module.exports = router;

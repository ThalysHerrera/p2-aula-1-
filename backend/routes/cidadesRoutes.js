const express = require("express");
const db = require("../db");
const router = express.Router();

// 🔹 [GET] Listar todas as cidades
router.get("/", (req, res) => {
  db.query("SELECT * FROM cidades", (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
});

// 🔹 [GET] Buscar cidade por ID
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM cidades WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (result.length === 0) return res.status(404).json({ mensagem: "Cidade não encontrada" });
    res.json(result[0]);
  });
});

// 🔹 [POST] Cadastrar uma nova cidade
router.post("/", (req, res) => {
  const { nome, estado } = req.body;
  if (!nome || !estado) {
    return res.status(400).json({ mensagem: "Nome e Estado são obrigatórios!" });
  }

  db.query("INSERT INTO cidades (nome, estado) VALUES (?, ?)", [nome, estado], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(201).json({ id: result.insertId, nome, estado });
  });
});

// 🔹 [PUT] Atualizar uma cidade por ID
router.put("/:id", (req, res) => {
  const { nome, estado } = req.body;

  db.query("UPDATE cidades SET nome = ?, estado = ? WHERE id = ?", [nome, estado, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: "Cidade atualizada com sucesso!" });
  });
});

// 🔹 [DELETE] Remover uma cidade por ID
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM cidades WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: "Cidade removida com sucesso!" });
  });
});

module.exports = router;

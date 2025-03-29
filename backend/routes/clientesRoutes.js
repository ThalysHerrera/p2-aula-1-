// const express = require("express");
// const db = require("../db"); // Importa a conexão com o MySQL
// const router = express.Router();

// // 🔹 [GET] Listar todos os clientes
// router.get("/", (req, res) => {
//   const sql = `
//     SELECT clientes.*, cidades.nome AS cidade_nome, cidades.estado AS cidade_estado 
//     FROM clientes 
//     LEFT JOIN cidades ON clientes.cidade_id = cidades.id
//   `;

//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ erro: err.message });
//     res.json(results);
//   });
// });

// // 🔹 [GET] Buscar um cliente por CPF
// router.get("/:cpf", (req, res) => {
//   const sql = `
//     SELECT clientes.*, cidades.nome AS cidade_nome, cidades.estado AS cidade_estado 
//     FROM clientes 
//     LEFT JOIN cidades ON clientes.cidade_id = cidades.id 
//     WHERE clientes.cpf = ?
//   `;

//   db.query(sql, [req.params.cpf], (err, result) => {
//     if (err) return res.status(500).json({ erro: err.message });
//     if (result.length === 0) return res.status(404).json({ mensagem: "Cliente não encontrado" });
//     res.json(result[0]);
//   });
// });

// // 🔹 [POST] Cadastrar um novo cliente
// router.post("/", (req, res) => {
//   const { cpf, nome, sobrenome, sexo, data_nascimento, email, estado_civil, cidade_id } = req.body;
//   if (!cpf || !nome || !email || !cidade_id) {
//     return res.status(400).json({ mensagem: "CPF, Nome, Email e Cidade são obrigatórios!" });
//   }

//   const sql = `
//     INSERT INTO clientes (cpf, nome, sobrenome, sexo, data_nascimento, email, estado_civil, cidade_id) 
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   db.query(sql, [cpf, nome, sobrenome, sexo, data_nascimento, email, estado_civil, cidade_id], (err, result) => {
//     if (err) return res.status(500).json({ erro: err.message });
//     res.status(201).json({ id: result.insertId, cpf, nome, sobrenome, sexo, data_nascimento, email, estado_civil, cidade_id });
//   });
// });


// router.put("/:cpf", (req, res) => {
//   const { nome, sobrenome, sexo, data_nascimento, email, estado_civil, cidade_id } = req.body;

//   // CPF com formatação: 009.008.007.00
//   const cpf = req.params.cpf;

//   if (!cpf) {
//     return res.status(400).json({ mensagem: "CPF não fornecido na URL" });
//   }

//   // console.log("Atualizando cliente com CPF:", cpf); // Mantendo a formatação

//   const sql = `
//     UPDATE clientes 
//     SET nome = ?, sobrenome = ?, sexo = ?, data_nascimento = ?, email = ?, estado_civil = ?, cidade_id = ?
//     WHERE cpf = ?
//   `;

//   db.query(sql, [nome, sobrenome, sexo, data_nascimento, email, estado_civil, cidade_id, cpf], (err, result) => {
//     if (err) {
//       return res.status(500).json({ erro: err.message });
//     }

//     console.log("Resultado da consulta:", result);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ mensagem: "Cliente não encontrado ou não alterado" });
//     }

//     res.json({ mensagem: "Cliente atualizado com sucesso!" });
//   });
// });

// router.delete("/:cpf", (req, res) => {
//   let cpf = req.params.cpf;

//   // Remover qualquer caractere não numérico do CPF
//   const cpfSemFormatacao = cpf.replace(/\D/g, ""); // Remove pontos e outros caracteres

//   // Agora, reformatar o CPF para o formato com pontos
//   const cpfComPontos = cpfSemFormatacao.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3.$4");

//   console.log("CPF a ser deletado com formatação:", cpfComPontos);  // Log do CPF com pontos

//   db.query("DELETE FROM clientes WHERE cpf = ?", [cpfComPontos], (err, result) => {
//     if (err) {
//       return res.status(500).json({ erro: err.message });
//     }

//     console.log("Resultado da consulta DELETE:", result);  // Log do resultado da query

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ mensagem: "Cliente não encontrado" });
//     }

//     res.json({ mensagem: "Cliente removido com sucesso!" });
//   });
// });





// module.exports = router;








const express = require("express");
const db = require("../db"); // Importa a conexão com o MySQL
const router = express.Router();

// 🔹 [GET] Listar todos os clientes
router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT clientes.*, cidades.nome AS cidade_nome, cidades.estado AS cidade_estado 
      FROM clientes 
      LEFT JOIN cidades ON clientes.cidade_id = cidades.id
    `;
    const [results] = await db.promise().query(sql);
    res.json(results);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// 🔹 [GET] Buscar um cliente por CPF
router.get("/:cpf", async (req, res) => {
  try {
    const sql = `
      SELECT clientes.*, cidades.nome AS cidade_nome, cidades.estado AS cidade_estado 
      FROM clientes 
      LEFT JOIN cidades ON clientes.cidade_id = cidades.id 
      WHERE clientes.cpf = ?
    `;
    const [result] = await db.promise().query(sql, [req.params.cpf]);
    if (result.length === 0) return res.status(404).json({ mensagem: "Cliente não encontrado" });
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// 🔹 [POST] Cadastrar um novo cliente
router.post("/", async (req, res) => {
  try {
    const { cpf, nome, sobrenome, sexo, data_nascimento, email, estado_civil, cidade_id } = req.body;
    if (!cpf || !nome || !email || !cidade_id) {
      return res.status(400).json({ mensagem: "CPF, Nome, Email e Cidade são obrigatórios!" });
    }
    const sql = `
      INSERT INTO clientes (cpf, nome, sobrenome, sexo, data_nascimento, email, estado_civil, cidade_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.promise().query(sql, [cpf, nome, sobrenome, sexo, data_nascimento, email, estado_civil, cidade_id]);
    res.status(201).json({ id: result.insertId, cpf, nome, sobrenome, sexo, data_nascimento, email, estado_civil, cidade_id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// 🔹 [PUT] Atualizar um cliente por CPF
router.put("/:cpf", async (req, res) => {
  try {
    const { nome, sobrenome, sexo, data_nascimento, email, estado_civil, cidade_id } = req.body;
    const cpf = req.params.cpf;
    if (!cpf) return res.status(400).json({ mensagem: "CPF não fornecido na URL" });
    
    const sql = `
      UPDATE clientes 
      SET nome = ?, sobrenome = ?, sexo = ?, data_nascimento = ?, email = ?, estado_civil = ?, cidade_id = ?
      WHERE cpf = ?
    `;
    const [result] = await db.promise().query(sql, [nome, sobrenome, sexo, data_nascimento, email, estado_civil, cidade_id, cpf]);
    
    if (result.affectedRows === 0) return res.status(404).json({ mensagem: "Cliente não encontrado ou não alterado" });
    res.json({ mensagem: "Cliente atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// // 🔹 [DELETE] Deletar um cliente por CPF
// router.delete("/:cpf", async (req, res) => {
//   try {
//     const cpf = req.params.cpf.replace(/\D/g, "");
//     const sql = "DELETE FROM clientes WHERE cpf = ?";
//     const [result] = await db.promise().query(sql, [cpf]);
    
//     if (result.affectedRows === 0) return res.status(404).json({ mensagem: "Cliente não encontrado" });
//     res.json({ mensagem: "Cliente removido com sucesso!" });
//   } catch (err) {
//     res.status(500).json({ erro: err.message });
//   }
// // });











// router.delete("/:cpf", (req, res) => {
//   const cpf = req.params.cpf.replace(/\D/g, ""); // Remove formatação do CPF

//   const sql = "DELETE FROM clientes WHERE cpf = ?";
//   db.query(sql, [cpf], (err, result) => {
//     if (err) return res.status(500).json({ erro: err.message });

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ mensagem: "Cliente não encontrado" });
//     }

//     res.json({ mensagem: "Cliente removido com sucesso!" });
//   });
// });











// router.delete("/:cpf", (req, res) => {
//   const cpf = req.params.cpf.replace(/\D/g, ""); // Remove formatação
//   console.log("Tentando deletar CPF:", cpf); // Log importante

//   const sql = "DELETE FROM clientes WHERE cpf = ?";
//   db.query(sql, [cpf], (err, result) => {
//     if (err) {
//       console.error("Erro no banco:", err);
//       return res.status(500).json({ erro: err.message });
//     }

//     console.log("Resultado do DELETE:", result); // Outro log importante

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ mensagem: "Cliente não encontrado" });
//     }

//     res.json({ mensagem: "Cliente removido com sucesso!" });
//   });
// });








router.delete("/:cpf", (req, res) => {
  let cpf = req.params.cpf;

  // Se o CPF não tiver formatação, vamos adicioná-la.
  const cpfComPontos = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3.$4");

  console.log("Tentando deletar CPF com formatação:", cpfComPontos);  // Log para verificar se o CPF foi formatado corretamente

  db.query("DELETE FROM clientes WHERE cpf = ?", [cpfComPontos], (err, result) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    console.log("Resultado da consulta DELETE:", result);  // Log do resultado da query

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    res.json({ mensagem: "Cliente removido com sucesso!" });
  });
});


module.exports = router;

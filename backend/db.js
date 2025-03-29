const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost", // Altere se seu MySQL estiver em outro servidor
  user: "root", // Seu usuário do MySQL
  password: "", // Sua senha do MySQL
  database: "cadastro_clientes", // Nome do banco de dados
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("✅ Conectado ao MySQL!");
  }
});

module.exports = db;
'   0'
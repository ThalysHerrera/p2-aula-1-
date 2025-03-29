const express = require("express");
const cors = require("cors");
const db = require("./db");


const app = express();
app.use(cors());
app.use(express.json());

// Importando as rotas
app.use("/clientes", require("./routes/clientesRoutes"));
app.use("/cidades", require("./routes/cidadesRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});







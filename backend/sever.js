const express = require("express");
const cors = require("cors");
const db = require("./db");
const { default: clientes } = require("../src/dados/clientes");
const clientesRoutes = require("./routes/clientesRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Importando as rotas
app.use("/clientes", require("./routes/clientesRoutes"));
app.use("/cidades", require("./routes/cidadesRoutes"));
app.use("/api/clientes", clientesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});







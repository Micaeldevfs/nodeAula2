const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


app.get("/buscar_usuarios", (req, res) => {
  connection.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      console.error("Error ao executar a consulta", err);
      res.status(500).send("Erro interno no servidor");
    } else {
      res.json(results);
    }
  });
});

app.post("/inserir_usuario", (req, res) => {
  const dados_b = req.body;

  connection.query(
    "INSERT INTO usuarios (nome, email, senha, cpf) VALUES (?, ?, ? ,?)",
    [dados_b.nome, dados_b.email, dados_b.senha, dados_b.cpf],
    (err, results) => {
      if (err) {
        console.error("Erro ao executar a consulta", err);
        res.status(500).send("Erro interno no servidor");
      } else {
        res.json({ mensagem: "Dados inseridos com sucesso" });
      }
    }
  );
});

app.listen(port, () => {
  console.log("Servidor iniciado com sucesso");
});

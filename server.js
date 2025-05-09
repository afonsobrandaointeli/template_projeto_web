require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const path = require('path');

db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    app.use(express.json());

    app.get('/', async (req, res) => {
        try {
            const result = await db.query('SELECT NOW()');
            res.send(`Hora atual no banco: ${result.rows[0].now}`);
        } catch (err) {
            res.status(500).send('Erro ao conectar com o banco.');
        }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
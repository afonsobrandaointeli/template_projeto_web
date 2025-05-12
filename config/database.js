const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Função para testar a conexão
async function testConnection() {
  const client = await pool.connect();
  try {
    await client.query('SELECT NOW()');
    console.log('Conexão com o banco de dados PostgreSQL estabelecida com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados PostgreSQL:', error);
    return false;
  } finally {
    client.release();
  }
}

// Função para executar uma consulta SQL
async function query(text, params) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  testConnection,
  query
};

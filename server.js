const fs = require('fs').promises;
const path = require('path');
const { testConnection, executeSqlFile } = require('./config/database');
const ProdutoModel = require('./models/produto');

async function iniciarAplicacao() {
  console.log('Iniciando aplicação...');
  
  // Testar conexão com o banco de dados
  const conexaoOk = await testConnection();
  if (!conexaoOk) {
    console.error('Não foi possível conectar ao banco de dados. Encerrando aplicação.');
    process.exit(1);
  }
  
  // Ler e executar arquivo de migração
  try {    
    // Buscar produtos com JOIN
    console.log('\n--- CONSULTA DE PRODUTOS COM JOIN ---');
    const produtos = await ProdutoModel.buscarTodosComDetalhes();
    console.table(produtos);
    
    // Gerar relatório
    console.log('\n--- RELATÓRIO DE PRODUTOS POR CATEGORIA ---');
    const relatorio = await ProdutoModel.gerarRelatorioPorCategoria();
    console.table(relatorio);
    
    console.log('\nAplicação executada com sucesso!');
    
    // Encerrar o programa após a execução
    process.exit(0);
  } catch (error) {
    console.error('Erro ao executar aplicação:', error);
    process.exit(1);
  }
}

iniciarAplicacao();
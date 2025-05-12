const { pool } = require('../config/database');

class ProdutoModel {
  // Método para buscar todos os produtos com JOIN
  static async buscarTodosComDetalhes() {
    try {
      const query = `
        SELECT 
          p.id, 
          p.nome, 
          p.preco, 
          p.estoque, 
          c.nome AS categoria, 
          f.nome AS fornecedor
        FROM produtos p
        LEFT JOIN categorias c ON p.categoria_id = c.id
        LEFT JOIN fornecedores f ON p.fornecedor_id = f.id
        ORDER BY p.id
      `;
      
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  }

  // Método para gerar relatório de produtos por categoria
  static async gerarRelatorioPorCategoria() {
    try {
      const query = `
        SELECT 
          c.nome AS categoria,
          COUNT(p.id) AS total_produtos,
          COALESCE(SUM(p.estoque), 0) AS total_estoque,
          ROUND(AVG(p.preco)::numeric, 2) AS preco_medio
        FROM categorias c
        LEFT JOIN produtos p ON c.id = p.categoria_id
        GROUP BY c.id, c.nome
        ORDER BY c.nome
      `;
      
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Erro ao gerar relatório por categoria:', error);
      throw error;
    }
  }
}

module.exports = ProdutoModel;
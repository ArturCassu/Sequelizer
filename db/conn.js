
const { Sequelize } = require('sequelize');

// Carregar variáveis de ambiente
require('dotenv').config();

const DB_NAME = process.env.DB_NAME || 'nodesequelize';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_DIALECT = process.env.DB_DIALECT || 'mysql';
const DB_PORT = process.env.DB_PORT || '3306';

console.log(DB_NAME);
console.log(DB_USER);
console.log(DB_PASS);
console.log(DB_HOST);
console.log(DB_DIALECT);



// Configuração da conexão com o banco de dados
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
	host: DB_HOST,
    port: DB_PORT || 3306,
	dialect: DB_DIALECT,
	logging: console.log, // Mostra as queries SQL no console
	define: {
		timestamps: true, // Adiciona createdAt e updatedAt automaticamente
		underscored: false, // Usa camelCase ao invés de snake_case
	},
	pool: {
		max: 10, // Máximo de conexões simultâneas
		min: 0,  // Mínimo de conexões
		acquire: 30000, // Tempo máximo para obter conexão (30s)
		idle: 10000, // Tempo máximo que uma conexão pode ficar inativa (10s)
	},
});

// Função para testar a conexão
async function testConnection() {
	try {
		await sequelize.authenticate();
		console.log('✅ Conexão com MySQL estabelecida com sucesso!');
	} catch (error) {
		console.error('❌ Erro ao conectar com o banco de dados:', error.message);
	}
}

testConnection();

module.exports = sequelize;

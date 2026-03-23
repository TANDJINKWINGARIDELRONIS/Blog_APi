const mysql = require('mysql2/promise');
require('dotenv').config();

const initDB = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
  
  await connection.changeUser({ database: process.env.DB_NAME });

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS articles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titre VARCHAR(255) NOT NULL,
      contenu TEXT NOT NULL,
      auteur VARCHAR(100) NOT NULL,
      categorie VARCHAR(100) DEFAULT 'General',
      tags VARCHAR(500) DEFAULT '',
      date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
      date_modification DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  console.log('✅ Base de données et table initialisées');
  await connection.end();
};

module.exports = initDB;
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API - INF222',
      version: '1.0.0',
      description: 'API REST pour la gestion d\'un blog simple. Projet INF222 EC1 — Université de Yaoundé I.',
      contact: {
        name: 'TANDJINKWINGARI DEL RONIS',
        url: 'https://github.com/TANDJINKWINGARIDELRONIS/Blog_APi',
      },
    },
    servers: [
      {
        url: 'https://blog-api-oafw.onrender.com',
        description: 'Serveur de production (Render)',
      },
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement',
      },
    ],
    tags: [
      {
        name: 'Articles',
        description: 'Gestion des articles du blog',
      },
    ],
    components: {
      schemas: {
        Article: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            titre: { type: 'string', example: 'Debut Node.js' },
            contenu: { type: 'string', example: 'Node.js est un environnement d\'exécution JavaScript' },
            auteur: { type: 'string', example: 'Ridel' },
            categorie: { type: 'string', example: 'General' },
            tags: { type: 'string', example: 'nodejs,javascript' },
            date_creation: { type: 'string', format: 'date-time' },
            date_modification: { type: 'string', format: 'date-time' },
          },
        },
        ArticleInput: {
          type: 'object',
          required: ['titre', 'contenu', 'auteur'],
          properties: {
            titre: { type: 'string', example: 'Debut Node.js' },
            contenu: { type: 'string', example: 'Node.js est un environnement d\'exécution JavaScript' },
            auteur: { type: 'string', example: 'Ridel' },
            categorie: { type: 'string', example: 'General' },
            tags: { type: 'string', example: 'nodejs,javascript' },
          },
        },
        ArticleUpdate: {
          type: 'object',
          properties: {
            titre: { type: 'string', example: 'Debut Node.js - Modifié' },
            contenu: { type: 'string', example: 'Contenu mis à jour' },
            categorie: { type: 'string', example: 'Tech' },
            tags: { type: 'string', example: 'nodejs,express' },
          },
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Opération réussie' },
          },
        },
        Error404: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Article non trouvé.' },
          },
        },
        Error400: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Données invalides.' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const docs = swaggerJsdoc(options);

module.exports = docs;
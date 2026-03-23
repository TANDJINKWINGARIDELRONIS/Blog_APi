//Importation des modules 

const swaggerJsdoc = require('swagger-jsdoc')

//definition des données pour la documentation swagger 

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API - INF222',
      version: '1.0.0',
      description: 'API Backend pour la gestion d\'un blog simple.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

//creation de la documentation a partir des options générées

const docs = swaggerJsdoc(options)


module.exports = docs;
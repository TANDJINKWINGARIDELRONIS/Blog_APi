const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./settings/swagger');
const initDB = require('./settings/init');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/articles', require('./routes/articles'));

//Route principale pour la gestion des erreurs 

app.get('/', (req, res) => {
  res.json({
    message: '🚀 Blog API - INF222',
    version: '1.0.0',
    documentation: `http://localhost:${PORT}/api-docs`,
    endpoints: {
      articles: `http://localhost:${PORT}/api/articles`
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route non trouvée.' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Erreur interne du serveur.', error: err.message });
});


//lancer le serveur 

const startServer = async () => {
  await initDB();
  app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📚 Documentation Swagger : http://localhost:${PORT}/api-docs`);
  });
};

startServer();
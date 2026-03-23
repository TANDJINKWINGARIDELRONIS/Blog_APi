const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAllArticles,
  searchArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');
const { getById } = require('../models/Article');


//Creation des regles de validation 

const createValidation = [
    body('titre').notEmpty().withMessage('Le titre est obligatoire').trim(),
    body('contenu').notEmpty().withMessage('Le contenu est obligatoire.').trim(),
    body('auteur').notEmpty().withMessage('L\auteur est obligatoire.').trim(),
    body('categorie').optional().trim(),
    body('tags').optional()
];


const updateValidation = [
  body('titre').optional().notEmpty().withMessage('Le titre ne peut pas être vide.').trim(),
  body('contenu').optional().notEmpty().withMessage('Le contenu ne peut pas être vide.').trim(),
  body('categorie').optional().trim(),
  body('tags').optional()
];


/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         titre:
 *           type: string
 *           example: "Introduction à Node.js"
 *         contenu:
 *           type: string
 *           example: "Node.js est un environnement d'exécution JavaScript..."
 *         auteur:
 *           type: string
 *           example: "Alice Dupont"
 *         categorie:
 *           type: string
 *           example: "Tech"
 *         tags:
 *           type: string
 *           example: "nodejs,javascript,backend"
 *         date_creation:
 *           type: string
 *           format: date-time
 *         date_modification:
 *           type: string
 *           format: date-time
 *     ArticleInput:
 *       type: object
 *       required:
 *         - titre
 *         - contenu
 *         - auteur
 *       properties:
 *         titre:
 *           type: string
 *           example: "Mon nouvel article"
 *         contenu:
 *           type: string
 *           example: "Contenu détaillé de l'article..."
 *         auteur:
 *           type: string
 *           example: "Jean Doe"
 *         categorie:
 *           type: string
 *           example: "Tech"
 *         tags:
 *           type: string
 *           example: "node,api,blog"
 */

//Definition des routes 

router.get('/search', searchArticles);
router.get('/',getAllArticles);
router.get('/:id',getArticleById);
router.post('/',createValidation,createArticle);
router.put('/:id',updateValidation,updateArticle);
router.delete('/:id',deleteArticle);


module.exports = router;
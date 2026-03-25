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

// ── Règles de validation ───────────────────────────────────────────────────

const createValidation = [
  body('titre').notEmpty().withMessage('Le titre est obligatoire').trim(),
  body('contenu').notEmpty().withMessage('Le contenu est obligatoire.').trim(),
  body('auteur').notEmpty().withMessage('L\'auteur est obligatoire.').trim(),
  body('categorie').optional().trim(),
  body('tags').optional()
];

const updateValidation = [
  body('titre').optional().notEmpty().withMessage('Le titre ne peut pas être vide.').trim(),
  body('contenu').optional().notEmpty().withMessage('Le contenu ne peut pas être vide.').trim(),
  body('categorie').optional().trim(),
  body('tags').optional()
];

// ── Schémas Swagger ────────────────────────────────────────────────────────

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
 *           example: "Debut Node.js"
 *         contenu:
 *           type: string
 *           example: "Node.js est un environnement d'exécution JavaScript"
 *         auteur:
 *           type: string
 *           example: "Ridel"
 *         categorie:
 *           type: string
 *           example: "General"
 *         tags:
 *           type: string
 *           example: "nodejs,javascript"
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
 *           example: "Debut Node.js"
 *         contenu:
 *           type: string
 *           example: "Node.js est un environnement d'exécution JavaScript"
 *         auteur:
 *           type: string
 *           example: "Ridel"
 *         categorie:
 *           type: string
 *           example: "General"
 *         tags:
 *           type: string
 *           example: "nodejs,javascript"
 *     ArticleUpdate:
 *       type: object
 *       properties:
 *         titre:
 *           type: string
 *           example: "Debut Node.js - Modifié"
 *         contenu:
 *           type: string
 *           example: "Contenu mis à jour"
 *         categorie:
 *           type: string
 *           example: "Tech"
 *         tags:
 *           type: string
 *           example: "nodejs,express"
 */

// ── Routes ─────────────────────────────────────────────────────────────────

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher des articles
 *     description: Recherche des articles dont le titre ou le contenu contient le texte donné
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Texte à rechercher
 *         example: "Node"
 *     responses:
 *       200:
 *         description: Liste des articles correspondants
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *       400:
 *         description: Paramètre query manquant
 *       500:
 *         description: Erreur serveur
 */
router.get('/search', searchArticles);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupérer tous les articles
 *     description: Retourne la liste complète des articles avec filtres optionnels
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: categorie
 *         schema:
 *           type: string
 *         description: Filtrer par catégorie
 *         example: "General"
 *       - in: query
 *         name: auteur
 *         schema:
 *           type: string
 *         description: Filtrer par auteur
 *         example: "Ridel"
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrer par date de création (YYYY-MM-DD)
 *         example: "2026-03-23"
 *     responses:
 *       200:
 *         description: Liste des articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *       500:
 *         description: Erreur serveur
 */
router.get('/', getAllArticles);

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un nouvel article
 *     description: Crée un article et le sauvegarde en base de données
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleInput'
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Article créé avec succès."
 *                 data:
 *                   $ref: '#/components/schemas/Article'
 *       400:
 *         description: Données invalides (titre, auteur ou contenu manquant)
 *       500:
 *         description: Erreur serveur
 */
router.post('/', createValidation, createArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupérer un article par son ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article
 *         example: 1
 *     responses:
 *       200:
 *         description: Article trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Article non trouvé."
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', getArticleById);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Modifier un article existant
 *     description: Met à jour les champs fournis d'un article existant
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article à modifier
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleUpdate'
 *     responses:
 *       200:
 *         description: Article modifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Article mis à jour avec succès."
 *                 data:
 *                   $ref: '#/components/schemas/Article'
 *       400:
 *         description: Données invalides ou aucune modification
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', updateValidation, updateArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     description: Supprime définitivement un article via son ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article à supprimer
 *         example: 1
 *     responses:
 *       200:
 *         description: Article supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Article #1 supprimé avec succès."
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', deleteArticle);

module.exports = router;
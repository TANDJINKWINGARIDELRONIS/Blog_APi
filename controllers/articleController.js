const Article = require ('../models/Article');
const {validationResult} = require('express-validator');


const createArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const { titre, contenu, auteur, categorie, tags } = req.body;
    const newId = await Article.create({ titre, contenu, auteur, categorie, tags });
    const newArticle = await Article.getById(newId);
    res.status(201).json({
      success: true,
      message: 'Article créé avec succès.',
      data: newArticle
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};


const getAllArticles = async (req, res) => {
    try {
        const {categorie, auteur, date } = req.query;
        const articles = await Article.getAll({categorie, auteur, date });
        res.status(200).json({
            success : true,
            count : articles.length,
            data : articles
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({success : false, message : 'Erreur serveur', error : error.message });

    }
};


const searchArticles = async(req, res) => {
    try{
        const { query } = req.query;
        if (!query || query.trim() === ''){
            return res.status(400).json({ success: false, message: 'Veuillez renseigner un article à rechercher'});
        }
        const articles = await Article.search(query.trim());
        res.status(200).json({
            success : true,
            count : articles.length,
            data : articles
        });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success : false, message : 'Erreur serveur',error : error.message});
    }
};


const getArticleById = async (req, res) => {
    try {
        const article = await Article.getById(req.params.id);
        if (!article) {
            return res.status(404).json({ success : false, message: 'Article non trouvé'});
        }
        res.status(200).json({ success: true, data: article});
    }catch (error){
        console.error(error);
        res.status(500).json({ success: false, message: 'Erreur serveur ',error: error.message});
    }
};

const updateArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const article = await Article.getById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article non trouvé.' });
    }
    const updated = await Article.update(req.params.id, req.body);
    if (!updated) {
      return res.status(400).json({ success: false, message: 'Aucune modification effectuée.' });
    }
    const updatedArticle = await Article.getById(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Article mis à jour avec succès.',
      data: updatedArticle
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.getById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article non trouvé.' });
    }
    await Article.delete(req.params.id);
    res.status(200).json({
      success: true,
      message: `Article #${req.params.id} supprimé avec succès.`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};


module.exports = {
  getAllArticles,
  searchArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};
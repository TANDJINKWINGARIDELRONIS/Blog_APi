const db = require('../settings/db');

const Article = {
    //Fonction getAll qui permet de recuperer les articles depuis la BD(Peut prendre des criteres de selection)

    getAll : async (filters = {}) => {
        let query = 'SELECT * FROM articles WHERE 1=1';
        const params = [];

        if (filters.categorie) {
            query += ' AND categorie = ?';
            params.push(filters.categorie);
        }
        if (filters.auteur){
            query += ' AND auteur = ?';
            params.push(filters.auteur);
        }
        if (filters.date){
            query += ' AND DATE(date_creation) = ?';
            params.push(filters.date);
        }

        query += ' ORDER BY date_creation DESC';
        const [rows] = await db.execute(query, params);
        return rows;
    },

    //Fonction getById fonction qui recupere un article en fonction de son ID

    getById : async(id) =>{
        const [rows] = await db.execute('SELECT * FROM articles WHERE id= ?', [id]);
        return rows[0] || null ;
    },

    //Fonction create quit cree un nouvel article 

    create : async( {titre,contenu, auteur, categorie, tags  })=> {
        const  tagsStr = Array.isArray(tags) ? tags.join(',') : (tags || "");
        const [result] = await db.execute(
            'INSERT INTO articles (titre, contenu, auteur, categorie, tags) VALUES (?,?,?,?,?)',
            [titre, contenu, auteur, categorie || 'General', tagsStr]
        );
        return result.insertId
    },

    //Foction update pour modifier un article 

    update : async (id, {titre, contenu, categorie, tags}) => {
    const fields = [];
    const params = [];

    if (titre !== undefined)     { fields.push('titre = ?');     params.push(titre); }
    if (contenu !== undefined)   { fields.push('contenu = ?');   params.push(contenu); }
    if (categorie !== undefined) { fields.push('categorie = ?'); params.push(categorie); }
    if (tags !== undefined) {
        const tagsStr = Array.isArray(tags) ? tags.join(',') : tags;
        fields.push('tags = ?');
        params.push(tagsStr);
    }

    if (fields.length === 0) return false;

    params.push(id);
    const [result] = await db.execute(
        `UPDATE articles SET ${fields.join(', ')} WHERE id = ?`,
        params
    );
    return result.affectedRows > 0;
},

    //Fonction delete pour supprimer un article 
    delete: async (id) => {
    const [result] = await db.execute('DELETE FROM articles WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  //Fonction search pour recherher un article 
  search: async (query) => {
    const searchTerm = `%${query}%`;
    const [rows] = await db.execute(
      'SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ? ORDER BY date_creation DESC',
      [searchTerm, searchTerm]
    );
    return rows;
  }
};

module.exports = Article;
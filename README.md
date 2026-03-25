# 📝 Blog API — INF222 EC1

API REST backend pour la gestion d'un blog simple, développée avec **Node.js (Express)** et **MySQL**, documentée avec **Swagger UI** et déployée sur **Render**.

---

## 🔗 Liens

| Ressource | Lien |
|-----------|------|
| 🌐 Site déployé | [https://blog-api-oafw.onrender.com](https://blog-api-oafw.onrender.com) |
| 📚 Documentation Swagger | [https://blog-api-oafw.onrender.com/api-docs](https://blog-api-oafw.onrender.com/api-docs) |
| 💻 Dépôt GitHub | [https://github.com/TANDJINKWINGARIDELRONIS/Blog_APi](https://github.com/TANDJINKWINGARIDELRONIS/Blog_APi) |

---

## 🚀 Démarrage rapide

### Prérequis

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/) v8+
- npm

### Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/TANDJINKWINGARIDELRONIS/Blog_APi.git
cd Blog_APi

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos identifiants MySQL

# 4. Lancer le serveur
npm run dev
```

Le serveur démarre sur **http://localhost:3000**

---

## 🗂️ Structure du projet

```
Blog_APi/
│
├── settings/
│   ├── db.js                 → Connexion MySQL (pool)
│   ├── init.js               → Création automatique de la BD et table
│   └── swagger.js            → Configuration Swagger
│
├── models/
│   └── Article.js            → Requêtes SQL (CRUD + recherche)
│
├── controllers/
│   └── articleController.js  → Logique métier + gestion d'erreurs
│
├── routes/
│   └── articles.js           → Routes Express + docs Swagger
│
├── index.html            → Interface web (HTML/CSS/JS)   
│
├── main.js                   → Point d'entrée du serveur
├── package.json              → Configuration du projet
├── .env.example              → Modèle des variables d'environnement
└── .gitignore                → Fichiers ignorés par Git
```

---

## 📡 Endpoints de l'API

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/articles` | Lister tous les articles |
| GET | `/api/articles?categorie=General` | Filtrer par catégorie |
| GET | `/api/articles?auteur=Ridel` | Filtrer par auteur |
| GET | `/api/articles?date=2026-03-23` | Filtrer par date |
| GET | `/api/articles/:id` | Récupérer un article par ID |
| POST | `/api/articles` | Créer un nouvel article |
| PUT | `/api/articles/:id` | Modifier un article |
| DELETE | `/api/articles/:id` | Supprimer un article |
| GET | `/api/articles/search?query=texte` | Rechercher un article |

---

## 💡 Exemples d'utilisation

### Créer un article

```bash
curl -X POST https://blog-api-oafw.onrender.com/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Debut Node.js",
    "contenu": "Node.js est un environnement d execution JavaScript",
    "auteur": "Ridel",
    "categorie": "General",
    "tags": "nodejs,javascript"
  }'
```

**Réponse (201) :**
```json
{
  "success": true,
  "message": "Article créé avec succès.",
  "data": {
    "id": 1,
    "titre": "Debut Node.js",
    "contenu": "Node.js est un environnement d execution JavaScript",
    "auteur": "Ridel",
    "categorie": "General",
    "tags": "nodejs,javascript",
    "date_creation": "2026-03-23T10:00:00.000Z",
    "date_modification": "2026-03-23T10:00:00.000Z"
  }
}
```

### Récupérer tous les articles

```bash
curl https://blog-api-oafw.onrender.com/api/articles
```

### Récupérer un article par ID

```bash
# Réponse 200
curl https://blog-api-oafw.onrender.com/api/articles/1

# Réponse 404
curl https://blog-api-oafw.onrender.com/api/articles/999
```

### Filtrer les articles

```bash
curl "https://blog-api-oafw.onrender.com/api/articles?categorie=General"
curl "https://blog-api-oafw.onrender.com/api/articles?auteur=Ridel"
curl "https://blog-api-oafw.onrender.com/api/articles?date=2026-03-23"
```

### Rechercher un article

```bash
curl "https://blog-api-oafw.onrender.com/api/articles/search?query=Node"
```

### Modifier un article

```bash
curl -X PUT https://blog-api-oafw.onrender.com/api/articles/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Debut Node.js - Modifié",
    "categorie": "Tech"
  }'
```

### Supprimer un article

```bash
curl -X DELETE https://blog-api-oafw.onrender.com/api/articles/1
```

---

## ✅ Codes HTTP utilisés

| Code | Signification |
|------|---------------|
| 200 | OK — Requête réussie |
| 201 | Created — Article créé |
| 400 | Bad Request — Données invalides |
| 404 | Not Found — Article introuvable |
| 500 | Internal Server Error — Erreur serveur |

---

## ⚙️ Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
# Configuration base de données
DB_HOST=your_host
DB_PORT=your_port
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database

# Configuration serveur
PORT=3000
```

---

## 🏗️ Technologies

| Technologie | Usage |
|-------------|-------|
| Node.js v20 | Runtime JavaScript |
| Express.js | Framework web |
| MySQL 8 | Base de données |
| mysql2 | Driver MySQL |
| express-validator | Validation des données |
| swagger-jsdoc | Génération documentation |
| swagger-ui-express | Interface documentation |
| dotenv | Variables d'environnement |
| cors | Gestion CORS |
| nodemon | Rechargement automatique (dev) |

---

## ☁️ Déploiement

| Service | Usage |
|---------|-------|
| [Render](https://render.com) | Hébergement Backend + Frontend |
| [Aiven](https://aiven.io) | Base de données MySQL cloud |

---

*Projet INF222 — EC1 — Développement Backend — Université de Yaoundé I — 2025/2026*
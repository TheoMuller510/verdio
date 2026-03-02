# Verdio - Backend API

## 📋 Contexte du projet

Verdio est un réseau social écologique permettant aux utilisateurs de relever des éco-challenges, seuls ou en groupe. Le backend est une API REST construite avec Node.js, Express et Sequelize (MySQL).

## 🎯 Objectifs du backend

- API REST complète pour le frontend React
- Système d'authentification JWT
- Gestion des utilisateurs et profils
- CRUD des challenges écologiques
- Système de points et trophées
- Gestion des participations aux challenges
- Fil d'actualité social (posts, likes, commentaires)
- Système de notifications

## 🛠️ Stack technique

- **Runtime** : Node.js (v22+)
- **Framework** : Express.js
- **ORM** : Sequelize
- **Base de données** : MySQL 8.0
- **Authentification** : JWT (jsonwebtoken + bcrypt)
- **Validation** : express-validator
- **CORS** : cors
- **Variables d'environnement** : dotenv

## 📁 Structure du projet

```
server/
├── src/
│   ├── config/
│   │   └── database.js          # Configuration Sequelize
│   ├── models/
│   │   ├── index.js             # Association des modèles
│   │   ├── User.js
│   │   ├── Role.js
│   │   ├── Challenge.js
│   │   ├── Category.js
│   │   ├── Participation.js
│   │   ├── Trophy.js
│   │   ├── UserTrophy.js
│   │   ├── Post.js
│   │   ├── Like.js
│   │   ├── Follower.js
│   │   ├── Notification.js
│   │   └── Report.js
│   ├── controllers/
│   │   ├── AuthController.js    # Inscription, connexion, logout
│   │   ├── UserController.js    # Profil, mise à jour, stats
│   │   ├── ChallengeController.js
│   │   ├── ParticipationController.js
│   │   ├── PostController.js
│   │   ├── TrophyController.js
│   │   └── NotificationController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js    # Vérification JWT
│   │   ├── roleMiddleware.js    # Vérification rôles (admin, modo)
│   │   └── validationMiddleware.js
│   ├── routes/
│   │   ├── index.js             # Routeur principal
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── challengeRoutes.js
│   │   ├── participationRoutes.js
│   │   ├── postRoutes.js
│   │   └── trophyRoutes.js
│   ├── utils/
│   │   ├── jwtHelper.js         # Génération/vérification tokens
│   │   └── errorHandler.js      # Gestion centralisée des erreurs
│   └── server.js                # Point d'entrée
├── .env.example
├── .env
├── .gitignore
├── package.json
└── CLAUDE.md
```

## 🗄️ Schéma de base de données

Référence : `verdio.sql`

### Tables principales

- **users** : Utilisateurs (id, pseudo, email, mot_de_passe, role_id, points, statut)
- **roles** : Rôles (admin, moderateur, utilisateur)
- **challenges** : Défis écologiques
- **categories** : Catégories de challenges (Transport, Alimentation, etc.)
- **participations** : Liens users ↔ challenges (avec preuve, statut de validation)
- **trophies** : Trophées débloquables
- **user_trophies** : Trophées obtenus par utilisateur
- **posts** : Publications (avec système de réponses via parent_post_id)
- **likes** : Likes sur les posts
- **followers** : Système de suivi entre utilisateurs
- **notifications** : Notifications (likes, commentaires, validations)
- **reports** : Signalements

### Relations clés

- User **belongsTo** Role
- User **hasMany** Participations
- User **belongsToMany** Trophies (via user_trophies)
- Challenge **belongsTo** Category
- Challenge **hasMany** Participations
- Post **belongsTo** User
- Post **hasMany** Posts (réponses)
- Post **hasMany** Likes

## 🔐 Authentification

- **Inscription** : POST `/api/auth/register`
  - Validation : email unique, pseudo unique, mot de passe fort
  - Hash du mot de passe avec bcrypt
  - Génération JWT

- **Connexion** : POST `/api/auth/login`
  - Vérification email + mot de passe
  - Génération JWT (expire 24h)

- **Middleware authMiddleware**
  - Vérifie le token JWT dans le header `Authorization: Bearer <token>`
  - Attache `req.user` avec les infos utilisateur

## 📡 Routes API principales

### Auth
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/me` - Récupérer utilisateur connecté (protégé)

### Users
- `GET /api/users/:id` - Profil public
- `PUT /api/users/:id` - Modifier profil (protégé)
- `GET /api/users/:id/stats` - Statistiques (challenges, points, trophées)
- `GET /api/users/:id/followers` - Liste des abonnés
- `POST /api/users/:id/follow` - Suivre un utilisateur (protégé)
- `DELETE /api/users/:id/follow` - Ne plus suivre (protégé)

### Challenges
- `GET /api/challenges` - Liste des challenges (avec filtres : categorie, difficulte)
- `GET /api/challenges/:id` - Détail d'un challenge
- `POST /api/challenges` - Créer un challenge (admin/modo)
- `PUT /api/challenges/:id` - Modifier un challenge (admin/modo)
- `DELETE /api/challenges/:id` - Supprimer un challenge (admin)

### Participations
- `POST /api/participations` - Soumettre une participation (protégé)
- `GET /api/participations/user/:userId` - Participations d'un utilisateur
- `PUT /api/participations/:id/validate` - Valider une participation (admin/modo)
- `PUT /api/participations/:id/reject` - Refuser une participation (admin/modo)

### Posts
- `GET /api/posts` - Fil d'actualité (paginé)
- `POST /api/posts` - Créer un post (protégé)
- `GET /api/posts/:id` - Détail d'un post + réponses
- `DELETE /api/posts/:id` - Supprimer un post (auteur ou admin)
- `POST /api/posts/:id/like` - Liker un post (protégé)
- `DELETE /api/posts/:id/like` - Unliker un post (protégé)

### Trophies
- `GET /api/trophies` - Liste des trophées
- `GET /api/users/:id/trophies` - Trophées d'un utilisateur

### Notifications
- `GET /api/notifications` - Notifications de l'utilisateur connecté (protégé)
- `PUT /api/notifications/:id/read` - Marquer comme lu (protégé)

## 🧪 Conventions de code

### Modèles Sequelize
```javascript
// Utiliser export default
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // Définition des champs
  }, {
    tableName: 'users',
    timestamps: false // Les timestamps sont gérés manuellement en SQL
  });
  
  return User;
};
```

### Contrôleurs
```javascript
// Classe avec méthodes statiques async
class UserController {
  static async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur introuvable' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UserController;
```

### Routes
```javascript
import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/:id', UserController.getProfile);
router.put('/:id', authMiddleware, UserController.updateProfile);

export default router;
```

### Gestion des erreurs
- Utiliser try/catch dans tous les contrôleurs
- Retourner des codes HTTP appropriés (200, 201, 400, 401, 403, 404, 500)
- Messages d'erreur clairs en français

### Validation
- Valider toutes les entrées utilisateur
- Sanitiser les données (trim, escape)
- Utiliser express-validator pour les validations complexes

## 🔒 Sécurité

- **Mots de passe** : Hashés avec bcrypt (salt rounds: 10)
- **JWT** : Secret fort stocké dans `.env`
- **CORS** : Configuré pour accepter uniquement le frontend (http://localhost:5173)
- **SQL Injection** : Protégé par Sequelize (requêtes préparées)
- **Rate limiting** : À implémenter sur les routes sensibles (login, register)

## 📦 Dépendances npm

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "sequelize": "^6.35.0",
    "mysql2": "^3.6.5",
    "jsonwebtoken": "^9.0.2",
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

## 🚀 Scripts npm

- `npm run dev` : Lance nodemon sur src/server.js
- `npm start` : Lance node src/server.js

## 🌍 Variables d'environnement (.env)

```env
# Serveur
PORT=3000
NODE_ENV=development

# Base de données
DB_HOST=localhost
DB_PORT=3306
DB_NAME=verdio
DB_USER=root
DB_PASSWORD=

# JWT
JWT_SECRET=votre_secret_ultra_securise_ici
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:5173
```

## ✅ Checklist de développement

### Phase 1 : Fondations
- [ ] Configuration de Sequelize (database.js)
- [ ] Création de tous les modèles Sequelize
- [ ] Définition des associations entre modèles (models/index.js)
- [ ] Test de connexion à la BDD

### Phase 2 : Authentification
- [ ] AuthController (register, login)
- [ ] Middleware authMiddleware (vérification JWT)
- [ ] Routes auth
- [ ] Test avec Postman/Thunder Client

### Phase 3 : Utilisateurs
- [ ] UserController (profil, stats, follow)
- [ ] Routes users
- [ ] Middleware roleMiddleware (admin, modo)

### Phase 4 : Challenges
- [ ] ChallengeController (CRUD)
- [ ] ParticipationController (soumettre, valider)
- [ ] Routes challenges + participations

### Phase 5 : Social
- [ ] PostController (CRUD, likes)
- [ ] NotificationController
- [ ] Routes posts + notifications

### Phase 6 : Trophées
- [ ] TrophyController
- [ ] Logique d'attribution automatique des trophées
- [ ] Routes trophies

### Phase 7 : Finitions
- [ ] Gestion centralisée des erreurs
- [ ] Validation des données
- [ ] Documentation API (Postman collection)
- [ ] Tests unitaires (optionnel)

## 🐛 Debugging

- Utiliser `console.log()` pour débugger
- Vérifier les logs SQL de Sequelize (activer logging dans config)
- Tester les routes avec Thunder Client (VS Code) ou Postman

## 📝 Notes importantes

- **Pas de ORM magique** : Bien comprendre les requêtes SQL générées par Sequelize
- **Timestamps** : Désactivés dans Sequelize car gérés manuellement en SQL
- **Cascade** : Les `ON DELETE CASCADE` sont définis en SQL, pas besoin de les redéfinir dans Sequelize
- **Transactions** : À utiliser pour les opérations critiques (attribution de points + trophées)
- **Pagination** : Obligatoire sur les listes (posts, challenges) avec `limit` et `offset`

## 🤝 Collaboration avec Claude Code

### Comment prompter efficacement

1. **Créer un fichier/une fonctionnalité**
   ```
   "Crée le modèle Sequelize User basé sur la table users de verdio.sql"
   ```

2. **Implémenter une route complète**
   ```
   "Implémente la route POST /api/auth/register avec validation et hash du mot de passe"
   ```

3. **Débugger**
   ```
   "J'ai une erreur 'User.findByPk is not a function', peux-tu vérifier models/index.js ?"
   ```

4. **Refactoring**
   ```
   "Peux-tu extraire la logique de validation JWT dans un fichier utils/jwtHelper.js ?"
   ```

### Conseils
- Sois précis sur les fichiers concernés
- Référence toujours le schéma SQL (verdio.sql)
- Demande une étape à la fois (pas tout le backend d'un coup)
- Vérifie que Claude respecte la structure définie

---

**Version** : 1.0  
**Dernière mise à jour** : 22/01/2026  
**Auteur** : Théo (DWWM 2024)
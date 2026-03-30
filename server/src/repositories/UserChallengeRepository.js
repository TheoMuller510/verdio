import { db } from "../config/database.js"

export class UserChallengeRepository {
  // vérifie si un user a déjà complété un challenge
  // retourne true/false — utilisé avant d'insérer pour éviter les doublons
  static async isCompleted(userId, challengeId) {
    const [rows] = await db.query(
      "SELECT id FROM user_challenges WHERE user_id = ? AND challenge_id = ?",
      [userId, challengeId]
    )
    return rows.length > 0
  }

  // insère une ligne dans user_challenges — marque le challenge comme complété
  static async create(userId, challengeId) {
    const [rows] = await db.query(
      "INSERT INTO user_challenges (user_id, challenge_id) VALUES (?, ?)",
      [userId, challengeId]
    )
    return rows.insertId
  }

  // récupère tout l'historique d'un user avec les infos complètes du challenge
  // JOIN challenges pour le titre, description, difficulté, points
  // JOIN categories pour l'icône et le nom de catégorie
  static async findByUserId(userId) {
    const [rows] = await db.query(
      `SELECT uc.completed_at, c.id, c.title, c.description, c.difficulty, c.points,
              cat.name AS category_name, cat.icon AS category_icon
       FROM user_challenges uc
       JOIN challenges c ON uc.challenge_id = c.id
       JOIN categories cat ON c.category_id = cat.id
       WHERE uc.user_id = ?
       ORDER BY uc.completed_at DESC`,
      [userId]
    )
    return rows
  }

  // calcule les stats d'un user : total de points, nombre de challenges complétés, niveau
  // COALESCE(SUM(...), 0) évite de retourner NULL si l'user n'a rien complété
  // niveau = 1 au départ, +1 tous les 100 points
  static async getStatsByUserId(userId) {
    const [rows] = await db.query(
      `SELECT COUNT(uc.id) AS completed, COALESCE(SUM(c.points), 0) AS points
       FROM user_challenges uc
       JOIN challenges c ON uc.challenge_id = c.id
       WHERE uc.user_id = ?`,
      [userId]
    )
    const { completed, points } = rows[0]
    const level = Math.floor(points / 100) + 1
    return { completed, points, level }
  }

  static async findRecent(limit = 10) {
    const [rows] = await db.query(
      `SELECT uc.completed_at, u.id AS userId, u.pseudo,
            c.title AS challengeTitle, cat.icon AS challengeIcon
         FROM user_challenges uc
         JOIN users u ON uc.user_id = u.id
         JOIN challenges c ON uc.challenge_id = c.id
         JOIN categories cat ON c.category_id = cat.id
         ORDER BY uc.completed_at DESC
         LIMIT ?`,
      [limit]
    )
    return rows
  }
}

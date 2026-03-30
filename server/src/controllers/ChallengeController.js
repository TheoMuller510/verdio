import { ChallengeRepository } from "../repositories/ChallengeRepository.js"

export class ChallengeController {
  static async getAll(_req, res) {
    try {
      const challenges = await ChallengeRepository.findAll()
      res.status(200).json(challenges)
    } catch (error) {
      console.error(error)
      res.status(500).json("Erreur interne du serveur")
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params
      const challenge = await ChallengeRepository.findById(id)

      if (!challenge) {
        res.status(404).json({ message: "Challenge introuvable" })
        return
      }

      res.status(200).json(challenge)
    } catch (error) {
      console.error(error)
      res.status(500).json("Erreur interne du serveur")
    }
  }

  static async create(req, res) {
    try {
      const { title, description, category_id, difficulty, points } = req.body

      if (!title || !description || !category_id || !difficulty) {
        res.status(400).json({ message: "Tous les champs sont requis" })
        return
      }

      if (!["easy", "medium", "hard"].includes(difficulty)) {
        res.status(400).json({ message: "La difficulté doit être easy, medium ou hard" })
        return
      }

      const id = await ChallengeRepository.create({ title, description, category_id, difficulty, points })
      const challenge = await ChallengeRepository.findById(id)

      res.status(201).json(challenge)
    } catch (error) {
      console.error(error)
      res.status(500).json("Erreur interne du serveur")
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params
      const challenge = await ChallengeRepository.findById(id)

      if (!challenge) {
        res.status(404).json({ message: "Challenge introuvable" })
        return
      }

      if (req.body.difficulty && !["easy", "medium", "hard"].includes(req.body.difficulty)) {
        res.status(400).json({ message: "La difficulté doit être easy, medium ou hard" })
        return
      }

      await ChallengeRepository.update({ id, ...req.body })
      const updated = await ChallengeRepository.findById(id)

      res.status(200).json(updated)
    } catch (error) {
      console.error(error)
      res.status(500).json("Erreur interne du serveur")
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params
      const challenge = await ChallengeRepository.findById(id)

      if (!challenge) {
        res.status(404).json({ message: "Challenge introuvable" })
        return
      }

      await ChallengeRepository.softDelete(id)

      res.status(200).json({ message: "Challenge désactivé avec succès" })
    } catch (error) {
      console.error(error)
      res.status(500).json("Erreur interne du serveur")
    }
  }
}

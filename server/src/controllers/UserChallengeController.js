import { UserChallengeRepository } from "../repositories/UserChallengeRepository.js"

export class UserChallengeController {
  static async complete(req, res) {
    try {
      const userId = req.user.id // vient du middleware
      const { challengeId } = req.body // vient du body de la requête

      // si déjà complété → conflit
      const alreadyDone = await UserChallengeRepository.isCompleted(userId, challengeId)
      if (alreadyDone) {
        res.status(409).json({ message: "Challenge déjà complété" })
        return
      }

      // sinon on insère
      await UserChallengeRepository.create(userId, challengeId)
      res.status(201).json({ message: "Challenge complété avec succès" })
    } catch (error) {
      console.error(error)
      res.status(500).json("Erreur interne du serveur")
    }
  }

  static async getHistory(req, res) {
    try {
      const userId = req.user.id
      const history = await UserChallengeRepository.findByUserId(userId)
      res.status(200).json(history)
    } catch (error) {
      console.error(error)
      res.status(500).json("Erreur interne du serveur")
    }
  }

  static async getStats(req, res) {
    try {
      const userId = req.user.id
      const statistics = await UserChallengeRepository.getStatsByUserId(userId)
      res.status(200).json(statistics)
    } catch (error) {
      console.error(error)
      res.status(500).json("Erreur interne du serveur")
    }
  }

  static async getFeed(req, res) {
    try {
      const feed = await UserChallengeRepository.findRecent()
      res.status(200).json(feed)
    } catch (error) {
      console.error(error)
      res.status(500).json("Erreur interne du serveur")
    }
  }
}

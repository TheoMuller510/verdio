import { Router } from "express"
import { ChallengeController } from "../../controllers/ChallengeController.js"
import { isAuthenticated } from "../../middlewares/isAuthenticated.js"
import { isAdmin } from "../../middlewares/isAdmin.js"

export const challengeRoutes = Router()

// routes protegees : accessibles a tout utilisateur connecte
challengeRoutes.get("/", isAuthenticated, ChallengeController.getAll)
challengeRoutes.get("/:id", isAuthenticated, ChallengeController.getById)

// routes admin : accessibles uniquement aux administrateurs
challengeRoutes.post("/", isAdmin, ChallengeController.create)
challengeRoutes.patch("/:id", isAdmin, ChallengeController.update)
challengeRoutes.delete("/:id", isAdmin, ChallengeController.delete)

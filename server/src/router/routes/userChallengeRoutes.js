import { Router } from "express"
import { UserChallengeController } from "../../controllers/UserChallengeController.js"
import { isAuthenticated } from "../../middlewares/isAuthenticated.js"

export const userChallengeRoutes = Router()

// routes protegees : accessibles a tout utilisateur connecte
userChallengeRoutes.post("/", isAuthenticated, UserChallengeController.complete)
userChallengeRoutes.get("/me", isAuthenticated, UserChallengeController.getHistory)
userChallengeRoutes.get("/me/stats", isAuthenticated, UserChallengeController.getStats)
userChallengeRoutes.get("/feed", isAuthenticated, UserChallengeController.getFeed)

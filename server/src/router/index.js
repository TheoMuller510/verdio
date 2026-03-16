import { Router } from "express"
import { authRoutes, challengeRoutes } from "./routes/index.js"

// router principal : centralise toutes les routes de l'application
export const router = Router()

// toutes les routes d'authentification sont prefixees par /auth
router.use("/auth", authRoutes)

// toutes les routes de challenges sont prefixees par /challenges
router.use("/challenges", challengeRoutes)
import { Router } from "express"
import { authRoutes } from "./routes/index.js"
// import { isAdmin } from "../middlewares/isAdmin.js"
// import { isAuthenticated } from "../middlewares/isAuthenticated.js"

// router principal : centralise toutes les routes de l'application
export const router = Router()

// toutes les routes d'authentification sont prefixees par /auth
router.use("/auth", authRoutes)
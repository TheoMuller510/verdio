import { AuthController } from "../../controllers/AuthController.js"
import { Router } from "express"
import { rateLimiter } from "../../middlewares/rateLimiter.js"

export const authRoutes = Router()

// routes publiques : accessibles sans token
authRoutes.post("/register", rateLimiter, AuthController.register)
authRoutes.post("/login", rateLimiter, AuthController.login)
authRoutes.post("/logout", AuthController.logout)
authRoutes.post("/refresh-token", AuthController.refreshToken)

// route protegee : necessite un token valide dans les cookies
authRoutes.get("/me", AuthController.me)
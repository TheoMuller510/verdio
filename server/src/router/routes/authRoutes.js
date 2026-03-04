import { AuthController } from "../../controllers/AuthController.js"
import { Router } from "express"

export const authRoutes = Router()

// routes publiques : accessibles sans token
authRoutes.post("/register", AuthController.register)
authRoutes.post("/login", AuthController.login)
authRoutes.post("/logout", AuthController.logout)
authRoutes.post("/refresh-token", AuthController.refreshToken)

// route protegee : necessite un token valide dans les cookies
authRoutes.get("/me", AuthController.me)
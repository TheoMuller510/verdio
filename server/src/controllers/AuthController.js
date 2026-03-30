import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { UserRepository } from "../repositories/UserRepository.js"

dotenv.config()

const {
  JWT_ALGO: jwtAlgo,
  JWT_SECRET_KEY: jwtSecret,
  JWT_REFRESH_SECRET_KEY: jwtRefreshSecret,
} = process.env

export class AuthController {
  static async register(req, res) {
    try {
      const { pseudo, email, password } = req.body

      if (!pseudo || !email || !password) {
        res.status(400).json({ message: "Tous les champs sont requis" })
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Format d'email invalide" })
        return
      }

      if (password.length < 8) {
        res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères" })
        return
      }

      if (pseudo.length < 2 || pseudo.length > 30) {
        res.status(400).json({ message: "Le nom d'utilisateur doit contenir entre 2 et 30 caractères" })
        return
      }

      const isEmailUser = await UserRepository.findByEmail(email)
      if (isEmailUser) {
        res.status(403).json({ message: "Cet email est déjà utilisé" })
        return
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      await UserRepository.create({ pseudo, email, password: hashedPassword })

      res.status(201).json({ message: "Compte créé avec succès" })
    } catch (error) {
      console.error(error)
      res.status(500).json("Erreur interne du serveur")
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await UserRepository.findByEmail(email)

      if (!user || !(user && (await bcrypt.compare(password, user.password)))) {
        res.status(401).json("Non autorisé")
        return
      }

      const { email: _email, password: _password, ...cleanUser } = user

      const token = jwt.sign(
        { user: cleanUser },
        jwtSecret,
        { algorithm: jwtAlgo, expiresIn: 7200 }
      )

      const refreshToken = jwt.sign(
        { user: cleanUser },
        jwtRefreshSecret,
        { algorithm: jwtAlgo, expiresIn: 3600 * 24 * 7 }
      )

      res.cookie("token", token, {
        sameSite: "Lax",
        httpOnly: true,
        secure: false,
        maxAge: 7200 * 1000,
        partitioned: false,
      })

      res.cookie("refresh_token", refreshToken, {
        sameSite: "Lax",
        httpOnly: true,
        secure: false,
        maxAge: 3600 * 24 * 7 * 1000,
        partitioned: false,
      })

      res.status(200).json("Authentifié avec succès")
    } catch (error) {
      res.status(500).json("Erreur interne du serveur")
    }
  }

  static async refreshToken(req, res) {
    try {
      const { refresh_token } = req.cookies

      try {
        const decoded = jwt.verify(refresh_token, jwtRefreshSecret)

        const token = jwt.sign(
          { user: decoded.user },
          jwtSecret,
          { algorithm: jwtAlgo, expiresIn: 7200 }
        )

        res.cookie("token", token, {
          sameSite: "Lax",
          httpOnly: true,
          secure: false,
          maxAge: 7200 * 1000,
          partitioned: false,
        })

        res.status(200).json({ message: "Token renouvelé" })
      } catch (error) {
        res.status(401).json("Token de rafraîchissement invalide")
      }
    } catch (error) {
      res.status(500).json("Erreur interne du serveur")
    }
  }

  static async me(req, res) {
    try {
      const { token } = req.cookies

      if (!token) {
        res.status(401).json("Non autorisé")
        return
      }

      const decoded = jwt.verify(token, jwtSecret)
      const user = await UserRepository.findById(decoded.user.id)
      const { password: _password, ...cleanUser } = user

      res.status(200).json({ user: cleanUser })
    } catch (error) {
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
        res.status(401).json("Non autorisé")
        return
      }
      res.status(500).json("Erreur interne du serveur")
    }
  }

  static async logout(req, res) {
    try {
      res.cookie("token", "", {
        sameSite: "Lax",
        httpOnly: true,
        secure: false,
        maxAge: 0,
        partitioned: false,
      })
      res.cookie("refresh_token", "", {
        sameSite: "Lax",
        httpOnly: true,
        secure: false,
        maxAge: 0,
        partitioned: false,
      })

      res.status(200).json("Déconnecté avec succès")
    } catch (error) {
      res.status(500).json("Erreur interne du serveur")
    }
  }
}

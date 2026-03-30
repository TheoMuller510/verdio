import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const { JWT_SECRET_KEY } = process.env

// middleware qui protege les routes : seuls les utilisateurs avec un token valide peuvent passer
export const isAuthenticated = async (req, res, next) => {
  try {
    // recuperation du token dans les cookies de la requete
    const { token } = req.cookies

    // verification du token : lance une erreur si invalide ou expire
    const decoded = jwt.verify(token, JWT_SECRET_KEY)

    // on récupère les données du user
    req.user = decoded.user

    // token valide : on laisse passer la requete vers la route suivante
    next()
  } catch (error) {
    // token absent, invalide ou expire : on refuse l'acces
    res.status(401).json("Token invalide")
    return
  }
}

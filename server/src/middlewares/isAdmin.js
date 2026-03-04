import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { UserRepository } from "../repositories/UserRepository.js"

dotenv.config()

const { JWT_SECRET_KEY } = process.env

export const isAdmin = async ( req, res, next ) => {

    try {
        // recuperation le token dans les cookies de la requete
        const { token } = req.cookies

        // on tente de recuperer le token decode (on le recupere uniquement si il est valide)
        const decoded = jwt.verify( token, JWT_SECRET_KEY )

        // on recupere userId dans le payload decode
        const { id } = decoded.user

        // on retrouve l'utilisateur en DB selon l'id recupere
        const user = await UserRepository.findById( id )

        // si l'utilisateur n'existe pas OU s'il n'a pas le role admin
        if( !user || user.role !== "admin" ) {
            // on provoque une erreur
            throw new Error("Invalid token")
        }

        // on laisse passer la requete
        next()

    } catch( error ) {

        // on envoie un message d'erreur en reponse, avec le code statut 401
        res.status(401)
        res.json("Invalid token")
        return;

    }
}
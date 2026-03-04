import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { UserRepository } from "../repositories/UserRepository.js"

dotenv.config()

const { 
    JWT_ALGO: jwtAlgo,
    JWT_SECRET_KEY: jwtSecret,
    JWT_REFRESH_SECRET_KEY: jwtRefreshSecret
} = process.env

export class AuthController {

    static async register( req, res ) {
        try {
            // on recupere les donnees du body de la requete
            const { userName, email, password } = req.body

            // on verifie si les donnees son absents
            if(
                !userName || !email || !password
            ) {
                // si au moins une d'elles est manquante
                // on envoi un message qui l'indique
                res.status(400)
                res.json({
                    message: "All fields are required"
                })
                return;
            }

            // on cherche un utilisateur pour l'email fourni
            const isEmailUser = await UserRepository.findByEmail( email )

            // si on a retrouve un utilisateur
            if( isEmailUser ) {
                // on envoie une reponse qui indique que l'email est deja utilise
                res.status(403)
                res.json({
                    message: "Email already in use"
                })
                return;
            }

            // on hash le mot de passe et on le stock dans "hashedPassword"
            const hashedPassword = await bcrypt.hash( password, 10 )

            // On envoie un objet avec les propriete name, email, et password
            // a la methode "create" du repository pour qu'il creer l'utilisateur
            await UserRepository.create({
                userName,
                email,
                password: hashedPassword
            })

            // on envoie une reponse contenant le message qui indique
            // que le compte a bien ete cree
            res.status(201)
            res.json({
                message: "Account created successfully."
            })

        } catch( error ) {
            console.error(error)
            res.status(500)
            res.json("Internal Server Error")
        }
    }

    static async login( req, res ) {
        try {
            // Recuperation de l'email et du password dans le body de la requete 
            const { email, password } = req.body

            // Recuperation de l'utilisateur selon l'email fourni 
            const user = await UserRepository.findByEmail( email )

            // Si on n'a pas retrouve l'utilisateur
            // ou
            // si on l'a retrouve mais que le mot de passe fourni ne correspond pas
            // au mot de passe hache stocke en DB
            if(
                !user ||
                !(user && await bcrypt.compare(password, user.password) )
            )
            {
                // on retourne un message d'erreur "Unauthorized" avec le code statut 401
                res.status(401)
                res.json("Unauthorized")
                return;
            }

            const { email: _email, password: _password, ...cleanUser } = user

            // on genere un token de connexion
            const token = jwt.sign(
                { user: cleanUser }, // payload du token
                jwtSecret, // cle secrete qui permet de signer le token
                { // Header du token
                    algorithm: jwtAlgo,
                    expiresIn: 7200
                }
            )

            // on genere un refresh token
            const refreshToken = jwt.sign(
                { user: cleanUser },
                jwtRefreshSecret,
                {
                    algorithm: jwtAlgo,
                    expiresIn: 3600 * 24 * 7
                }
            )

            // On demande a la reponse de transmettre le token sous forme de cookie
            // qui ne sera transmis qu'avec les requetes HTTP (httpOnly est true)
            // qui sera transmis meme sans SSL/TLS (https)
            // dont l'age maximum est 1h apres sa creation
            res.cookie("token", token, {
                sameSite: "Lax",
                httpOnly: true,
                secure: false,
                maxAge: 7200*1000,
                partitioned: false
            })

            res.cookie("refresh_token", refreshToken, {
                sameSite: "Lax",
                httpOnly: true,
                secure: false,
                maxAge: 3600 * 24 * 7 * 1000,
                partitioned: false
            })

            res.status(200)
            // Envoie d'une reponse qui contient un message
            res.json("Authenticated successfuly !")
        } catch( error ) {
            res.status(500)
            res.json("Internal Server Error")
        }
    }

    static async refreshToken( req, res ) {
        try {
            const { refresh_token } = req.cookies

            try {
                // on verifie si le refresh token est valide
                const decoded = jwt.verify( refresh_token, jwtRefreshSecret )
                

                const token = jwt.sign(
                    { user: decoded.user }, // payload du token
                    jwtSecret, // cle secrete qui permet de signer le token
                    { // Header du token
                        algorithm: jwtAlgo,
                        expiresIn: 7200
                    }
                )

                res.cookie("token", token, {
                    sameSite: "Lax",
                    httpOnly: true,
                    secure: false,
                    maxAge: 7200*1000,
                    partitioned: false
                })

                res.status(200)
                res.json({
                    message: "Token refreshed"
                })
            } catch( error ) {
                res.status(401)
                res.json("Invalid refresh token")
            }

        } catch( error ) {
            res.status(500)
            res.json("Internal Server Error")
        }
    }

    static async me( req, res ) {
        try {

            // recuperation du token dans les cookies de la requete
            const { token } = req.cookies
            

            // si aucun token n'est present, l'utilisateur n'est pas connecte
            if( !token ) {
                res.status(401)
                res.json("Unauthorized")
                return;
            }

            // verification du token et recuperation du payload decode
            const decoded = jwt.verify( token, jwtSecret )
            // recuperation de l'utilisateur en DB selon l'id stocke dans le payload
            const user = await UserRepository.findById( decoded.user.id )
            const { password: _password, ...cleanUser } = user
            res.status(200)
            res.json({ user: cleanUser })

        } catch( error ) {
            // si le token est invalide ou expire, on refuse l'acces
            if( error.name === "JsonWebTokenError" || error.name === "TokenExpiredError" ) {
                res.status(401)
                res.json("Unauthorized")
                return;
            }
            res.status(500)
            res.json("Internal Server Error")
        }
    }

    static async logout( req, res ) {
        try {
            // on expire le cookie token pour le supprimer cote client
            res.cookie("token", "", {
                sameSite: "Lax",
                httpOnly: true,
                secure: false,
                maxAge: 0, // indique que le cookie est perime pour qu'il soit supprime
                partitioned: false
            })
            // on expire egalement le refresh token pour empecher toute reconnexion silencieuse
            res.cookie("refresh_token", "", {
                sameSite: "Lax",
                httpOnly: true,
                secure: false,
                maxAge: 0,
                partitioned: false
            })
            res.status(200)
            res.json("Unauthenticated successfully")
        } catch( error ) {
            res.status(500)
            res.json("Internal Server Error")
        }
        
    }

}
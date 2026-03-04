import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()

// creation d'un pool de connexions MySQL
// un pool reutilise les connexions existantes au lieu d'en creer une nouvelle a chaque requete
export const db = mysql.createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // attend qu'une connexion soit disponible si toutes sont occupees
    waitForConnections: true,
    // nombre maximum de connexions simultanees dans le pool
    connectionLimit: 10,
    // 0 = pas de limite de requetes en attente
    queueLimit: 0,
    // maintient les connexions actives pour eviter les timeouts
    enableKeepAlive: true,
    keepAliveInitialDelay: 0

})
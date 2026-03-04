import { db } from "../config/database.js"

export class UserRepository {

    static async findAll(){

        // on recupere tous les utilisateurs de la table users
        const [rows] = await db.query("SELECT * FROM users")
        return rows

    }

    static async findById( id ) {

        // on recherche un utilisateur selon son id
        const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [ id ])
        // on retourne l'utilisateur trouve, ou null si aucun resultat
        return rows.length ? rows[0] : null

    }

    static async findByEmail ( email ) {

        // on recherche un utilisateur selon son email
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [ email ])
        // on retourne l'utilisateur trouve, ou null si aucun resultat
        return rows.length ? rows[0] : null

    }

    static async create( data ) {

        // on insere un nouvel utilisateur en DB avec les donnees fournies
        await db.query("INSERT INTO users (userName, email, password) VALUES ( ?, ?, ? )", [ data.userName, data.email, data.password ])

    }

    static async update( data ) {

        // on initialise le debut de la requete SQL
        let sql = "UPDATE users SET"
        // on initialise le tableau de valeur qui remplaceront les "?" dans la requete SQL
        const values = []
    
        // pour chaque propriete associee a une valeur dans l'objet data
        for (const [prop, value] of Object.entries(data)) {
                // si la propriete est nommee autrement que "id"
            if( prop !== "id" ) {
                    // on ajout " prop = ?," a la requete SQL
                sql += ` ${prop} = ?,`
                    // on ajoute la valeur associee a cette prop au tableau de valeurs de remplacement
                values.push(value)
            }
        }
        // on supprime la virgule superflue en fin de requete SQL
        sql = sql.slice(0, -1)
            
        // on complete la requete SQL en precisant l'id de l'element a mettre a jour
        sql += " WHERE id = ?"
        // on ajoute la valeur de l'id `a la fin du tableau de valeur de remplacement
        values.push( data.id )
        // executer la requete
        await db.query(sql, values)
    }
    
    static async delete( id ) {
        // on supprime l'utilisateur dont l'id correspond
        await db.query("DELETE FROM users WHERE id = ?", [ id ])
    }

}
import { db } from "../config/database.js"

export class ChallengeRepository {

    static async findAll() {

        // on recupere tous les challenges actifs avec les infos de leur categorie
        const [rows] = await db.query(`
            SELECT c.*, cat.name AS category_name, cat.icon AS category_icon
            FROM challenges c
            JOIN categories cat ON c.category_id = cat.id
            WHERE c.active = TRUE
        `)
        return rows

    }

    static async findById( id ) {

        // on recupere un challenge par son id avec les infos de sa categorie
        const [rows] = await db.query(`
            SELECT c.*, cat.name AS category_name, cat.icon AS category_icon
            FROM challenges c
            JOIN categories cat ON c.category_id = cat.id
            WHERE c.id = ?
        `, [ id ])
        return rows.length ? rows[0] : null

    }

    static async create( data ) {

        // on insere un nouveau challenge avec les donnees fournies
        const [result] = await db.query(
            "INSERT INTO challenges (title, description, category_id, difficulty, points) VALUES (?, ?, ?, ?, ?)",
            [ data.title, data.description, data.category_id, data.difficulty, data.points ]
        )
        return result.insertId

    }

    static async update( data ) {

        // on initialise le debut de la requete SQL
        let sql = "UPDATE challenges SET"
        const values = []

        // pour chaque propriete autre que l'id, on construit dynamiquement la requete
        for (const [prop, value] of Object.entries(data)) {
            if( prop !== "id" ) {
                sql += ` ${prop} = ?,`
                values.push(value)
            }
        }
        // on supprime la virgule superflue en fin de requete
        sql = sql.slice(0, -1)
        sql += " WHERE id = ?"
        values.push( data.id )

        await db.query(sql, values)

    }

    static async softDelete( id ) {

        // on desactive le challenge sans le supprimer de la DB
        await db.query("UPDATE challenges SET active = FALSE WHERE id = ?", [ id ])

    }

}

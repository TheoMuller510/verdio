import { ChallengeRepository } from "../repositories/ChallengeRepository.js"

export class ChallengeController {

    static async getAll( req, res ) {
        try {

            const challenges = await ChallengeRepository.findAll()
            res.status(200)
            res.json(challenges)

        } catch( error ) {
            console.error(error)
            res.status(500)
            res.json("Internal Server Error")
        }
    }

    static async getById( req, res ) {
        try {

            const { id } = req.params
            const challenge = await ChallengeRepository.findById( id )

            // si aucun challenge n'est trouve, on retourne 404
            if( !challenge ) {
                res.status(404)
                res.json({ message: "Challenge not found" })
                return;
            }

            res.status(200)
            res.json(challenge)

        } catch( error ) {
            console.error(error)
            res.status(500)
            res.json("Internal Server Error")
        }
    }

    static async create( req, res ) {
        try {

            const { title, description, category_id, difficulty, points } = req.body

            // on verifie que les champs obligatoires sont presents
            if( !title || !description || !category_id || !difficulty ) {
                res.status(400)
                res.json({ message: "All fields are required" })
                return;
            }

            // on verifie que la difficulte est une valeur valide
            if( !["easy", "medium", "hard"].includes(difficulty) ) {
                res.status(400)
                res.json({ message: "Difficulty must be easy, medium or hard" })
                return;
            }

            const id = await ChallengeRepository.create({ title, description, category_id, difficulty, points })
            const challenge = await ChallengeRepository.findById( id )

            res.status(201)
            res.json(challenge)

        } catch( error ) {
            console.error(error)
            res.status(500)
            res.json("Internal Server Error")
        }
    }

    static async update( req, res ) {
        try {

            const { id } = req.params
            const challenge = await ChallengeRepository.findById( id )

            // on verifie que le challenge existe
            if( !challenge ) {
                res.status(404)
                res.json({ message: "Challenge not found" })
                return;
            }

            // on verifie la difficulte si elle est fournie
            if( req.body.difficulty && !["easy", "medium", "hard"].includes(req.body.difficulty) ) {
                res.status(400)
                res.json({ message: "Difficulty must be easy, medium or hard" })
                return;
            }

            await ChallengeRepository.update({ id, ...req.body })
            const updated = await ChallengeRepository.findById( id )

            res.status(200)
            res.json(updated)

        } catch( error ) {
            console.error(error)
            res.status(500)
            res.json("Internal Server Error")
        }
    }

    static async delete( req, res ) {
        try {

            const { id } = req.params
            const challenge = await ChallengeRepository.findById( id )

            // on verifie que le challenge existe
            if( !challenge ) {
                res.status(404)
                res.json({ message: "Challenge not found" })
                return;
            }

            // soft delete : on desactive le challenge sans le supprimer
            await ChallengeRepository.softDelete( id )

            res.status(200)
            res.json({ message: "Challenge deactivated successfully" })

        } catch( error ) {
            console.error(error)
            res.status(500)
            res.json("Internal Server Error")
        }
    }

}

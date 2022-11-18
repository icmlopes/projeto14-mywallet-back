import { userSchema } from "../index.js"
import { usersCollection } from "../database/db.js"

export async function postSignUp(req, res) {
    //nome, email e senha
    const user = req.body

    const validation = userSchema.validate(user)

    if(validation.error){
        return res.sendStatus(422)
    }

    try {
        await usersCollection.insertOne(user)
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
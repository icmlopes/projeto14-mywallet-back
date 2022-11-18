import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import joi from "joi"
import bcrypt from "bcrypt"
import { v4 as uuidV4 } from "uuid"
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const userSchema = joi.object({
    name: joi.string().required().min(3),
    email: joi.string().required(),
    password: joi.string().required(),
    repeat_password: joi.string().required(),
})

// const financialSchema = joi.object({
//     date: joi.string().required(),
//     descripton: joi.string().required().min(1),
//     income: joi.number().required(),
//     expense: joi.number().required(),
// })

const mongoClient = new MongoClient(process.env.MONGO_URI)

try {
    await mongoClient.connect()
    console.log("MongoDB working!")
} catch (err) {
    console.log(err)
}

const db = mongoClient.db("mywallet")
const usersCollection = db.collection("users")
const balanceCollection = db.collection("balance")


app.post("/sign-up", async (req, res) => {
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
})

app.post("/", async (req, res) => {
    res.send("Ok")
})

app.listen(5000, () => console.log("Server running in port: 5000"))
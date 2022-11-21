import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import joi from "joi"
import router from "./routes/signUpRoutes.js"
import bcrypt from "bcrypt"
import { v4 as uuidV4 } from "uuid"
dotenv.config()

import signUpRouters from "./routes/signUpRoutes.js"
import signInRouters from "./routes/signInRoutes.js"

const app = express()
app.use(express.json())
app.use(cors())
app.use(signUpRouters)
app.use(signInRouters)


export const userSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().required(),
    password: joi.string().required(),
})

export const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().min(3).required(),
})




// export const financialSchema = joi.object({
//     date: joi.string().required(),
//     descripton: joi.string().required().min(1),
//     income: joi.number().required(),
//     expense: joi.number().required(),
// })



app.listen(5000, () => console.log("Server running in port: 5000"))
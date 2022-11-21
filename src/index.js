import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import joi from "joi"
import router from "./routes/signUpRoutes.js"
import bcrypt from "bcrypt"
dotenv.config()

import signUpRouters from "./routes/signUpRoutes.js"
import signInRouters from "./routes/signInRoutes.js"
import balanceRouters from "./routes/balanceRoute.js"

const app = express()
app.use(express.json())
app.use(cors())
app.use(signUpRouters)
app.use(signInRouters)
app.use(balanceRouters)

app.use(router)

export const userSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().required(),
    password: joi.string().required(),
    repeat_password: joi.string().required(),
})

export const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().min(3).required(),
})

 export const financialSchema = joi.object({
     descripton: joi.string().required().min(4),
     number: joi.number().required(),
    })



app.listen(5000, () => console.log("Server running in port: 5000"))
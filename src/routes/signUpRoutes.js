import {
    postSignUp,
} from "../controllers/signUpController.js"

import { Router } from "express"

const router = Router()

router.post("/sign-up", postSignUp)

export default router
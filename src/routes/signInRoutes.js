import {
    postSignIn,
    getToken
} from "../controllers/signInController.js"

import { Router } from "express"

const router = Router()

router.post("/", postSignIn)
router.get("/", getToken)

export default router
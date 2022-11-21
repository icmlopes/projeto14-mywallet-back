import {
    postBalance
} from "../controllers/balanceController.js"

import { Router } from "express"

const router = Router()

router.post("/balance", postBalance)

export default router
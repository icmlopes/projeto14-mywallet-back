import { financialSchema } from "../index.js";
import { usersCollection } from "../database/db.js";
import { sessions } from "../database/db.js";

export async function postBalance(req, res) {

    const {  descripton, number } = req.body;

    const validation = financialSchema.validate({ descripton, number });

    if (validation.error) {
      return res.sendStatus(422);
    }

    try {
        const newEntry = await usersCollection.updateOne(
            { _id: users._id},
            { $push: { transactions: {descripton, number}}}
        );
    
        res.sendStatus(201);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }

}
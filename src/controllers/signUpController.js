import { userSchema } from "../index.js";
import { usersCollection } from "../database/db.js";
import bcrypt from "bcrypt";

export async function postSignUp(req, res) {
  //nome, email e senha
  const user = req.body;

  const validation = userSchema.validate(user);

  if (validation.error) {
    return res.sendStatus(422);
  }

  try {
    const passwordHashed = bcrypt.hashSync(user.password, 10);

    await usersCollection.insertOne({
      ...user,
      password: passwordHashed,
      transactions: [],
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

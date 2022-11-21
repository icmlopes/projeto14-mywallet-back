import { loginSchema } from "../index.js";
import { usersCollection } from "../database/db.js";
import { sessions } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid"

export async function postSignIn(req, res) {
  const { email, password } = req.body;

  const validation = loginSchema.validate({ email, password });

  if (validation.error) {
    return res.sendStatus(422);
  }

  try {
    const existingUser = await usersCollection.findOne({ email });

    if (!existingUser) {
      res.sendStatus(401);
      return;
    }

    console.log(existingUser);
    console.log(password);

    const isAuthorized = bcrypt.compareSync(password, existingUser.password);
    
    if (isAuthorized) {

        const token = uuid()

        await sessions.insertOne({ token, userId: existingUser._id})

        return res.send(token)
        return res.sendStatus(200);
    }
    res.sendStatus(401);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getToken(req, res) {

    const authorization = req.headers.authorization
    const token = authorization?.replace('Bearer ', '')

    if(!token){
        return res.sendStatus(401)
    }

    try {
        const session = await sessions.findOne({ token })
    if(!session){
        return res.sendStatus(401)
    }

    const user = await usersCollection.findOne({ _id: session.userId })

    delete user.password;

    return res.send(user)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}


import express from "express";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  //

  const { username, email, password } = req.body.userSignUpInfo;

  //

  try {
    const user = await UserModel.find({ username: username });

    if (
      user.length == 0 &&
      user[0]?.username != username &&
      user[0]?.email != email
    ) {
      const createNewUser = await UserModel({
        username,
        email,
        password,
      });

      await createNewUser.save();
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {}
});

router.post("/login", async (req, res) => {
  const { username, email, password } = req.body.loginInfo;

  try {
    const user = await UserModel.find({ email: email });

    //

    //

    if (
      user.length != 0 &&
      user[0].email == email &&
      user[0].password == password
    ) {
      res.json({ success: true, user: user[0].username });
    } else {
      res.json({ success: false });
    }
  } catch (error) {}
});

export default router;

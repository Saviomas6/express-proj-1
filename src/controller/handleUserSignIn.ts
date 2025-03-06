import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserSignUp } from "../model/login";

export const handleUserSignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existUser = await UserSignUp.findOne({ email });
    if (!existUser) {
      res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, existUser?.password!);
    if (!matchPassword) {
      res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        email: existUser?.email,
        id: existUser?._id,
        name: existUser?.name,
      },
      process.env.SECRET_KEY!,
      { expiresIn: "7d" }
    );

    res.status(201).json({ user: existUser, token, message: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

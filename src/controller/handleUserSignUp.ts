import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { UserSignUp } from "../model/login";

export const handleUserSignUp = async (req: Request, res: Response) => {
  const {
    name,
    username,
    email,
    password,
    confirmPassword,
    bio,
    profileUrl,
    bannerUrl,
    joinedDate,
  } = req.body;
  try {
    const existUser = await UserSignUp.findOne({ email });
    if (existUser) {
      res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const confirmHashPassword = await bcrypt.hash(confirmPassword, 10);

    const result = new UserSignUp({
      name,
      username,
      email,
      password: hashPassword,
      confirmPassword: confirmHashPassword,
      bio,
      profileUrl,
      bannerUrl,
      joinedDate,
    });
    result
      .save()
      .then(() => res.status(201).send({ user: result, message: true }))
      .catch((e: any) => res.status(400).send(e));
  } catch (err) {
    const response = {
      success: false,
      status: "error",
      message: (err as Error).message,
    };
    res.status(500).json(response);
  }
};

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserSignUp } from "../model/login";

export const handleUserDetails = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      res.status(401).json({ message: "Missing or invalid token" });
    }

    const jwtToken = token?.split(" ")[1]!;

    jwt.verify(jwtToken, process.env.SECRET_KEY!, async (err, decoded: any) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      }
      const user = await UserSignUp.findOne(
        { email: decoded.email },
        { __v: 0, password: 0, confirmPassword: 0 }
      );

      res.json(user);
    });
  } catch (err) {
    const response = {
      success: false,
      status: "error",
      message: (err as Error).message,
    };
    res.status(500).json(response);
  }
};

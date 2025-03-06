import { Router } from "express";
import { handleUserSignUp } from "../controller/handleUserSignUp";
import { handleUserSignIn } from "../controller/handleUserSignIn";
import { handleUserDetails } from "../controller/handleUserDetails";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("Hello Express");
});
userRouter.post("/signin", handleUserSignIn);
userRouter.post("/signup", handleUserSignUp);
userRouter.get("/userDetail", handleUserDetails);

export default userRouter;

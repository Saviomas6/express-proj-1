"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handleUserSignUp_1 = require("../controller/handleUserSignUp");
const handleUserSignIn_1 = require("../controller/handleUserSignIn");
const handleUserDetails_1 = require("../controller/handleUserDetails");
const userRouter = (0, express_1.Router)();
userRouter.get("/", (req, res) => {
    res.send("Hello Express");
});
userRouter.post("/signin", handleUserSignIn_1.handleUserSignIn);
userRouter.post("/signup", handleUserSignUp_1.handleUserSignUp);
userRouter.get("/userDetail", handleUserDetails_1.handleUserDetails);
exports.default = userRouter;

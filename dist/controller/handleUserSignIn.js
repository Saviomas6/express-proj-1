"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserSignIn = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login_1 = require("../model/login");
const handleUserSignIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existUser = await login_1.UserSignUp.findOne({ email });
        if (!existUser) {
            res.status(404).json({ message: "User not found" });
        }
        const matchPassword = await bcrypt_1.default.compare(password, existUser?.password);
        if (!matchPassword) {
            res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jsonwebtoken_1.default.sign({
            email: existUser?.email,
            id: existUser?._id,
            name: existUser?.name,
        }, process.env.SECRET_KEY, { expiresIn: "7d" });
        res.status(201).json({ user: existUser, token, message: true });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.handleUserSignIn = handleUserSignIn;

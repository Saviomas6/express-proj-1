"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserSignUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const login_1 = require("../model/login");
const handleUserSignUp = async (req, res) => {
    const { name, username, email, password, confirmPassword, bio, profileUrl, bannerUrl, joinedDate, } = req.body;
    try {
        const existUser = await login_1.UserSignUp.findOne({ email });
        if (existUser) {
            res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const confirmHashPassword = await bcrypt_1.default.hash(confirmPassword, 10);
        const result = new login_1.UserSignUp({
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
            .catch((e) => res.status(400).send(e));
    }
    catch (err) {
        const response = {
            success: false,
            status: "error",
            message: err.message,
        };
        res.status(500).json(response);
    }
};
exports.handleUserSignUp = handleUserSignUp;

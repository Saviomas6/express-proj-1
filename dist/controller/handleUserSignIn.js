"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserSignIn = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login_1 = require("../model/login");
const handleUserSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existUser = yield login_1.UserSignUp.findOne({ email });
        if (!existUser) {
            res.status(404).json({ message: "User not found" });
        }
        const matchPassword = yield bcrypt_1.default.compare(password, existUser === null || existUser === void 0 ? void 0 : existUser.password);
        if (!matchPassword) {
            res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jsonwebtoken_1.default.sign({
            email: existUser === null || existUser === void 0 ? void 0 : existUser.email,
            id: existUser === null || existUser === void 0 ? void 0 : existUser._id,
            name: existUser === null || existUser === void 0 ? void 0 : existUser.name,
        }, process.env.SECRET_KEY, { expiresIn: "7d" });
        res.status(201).json({ user: existUser, token, message: true });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.handleUserSignIn = handleUserSignIn;

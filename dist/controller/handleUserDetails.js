"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserDetails = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login_1 = require("../model/login");
const handleUserDetails = async (req, res) => {
    const data = req.body;
    try {
        const token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer ")) {
            res.status(401).json({ message: "Missing or invalid token" });
        }
        const jwtToken = token?.split(" ")[1];
        jsonwebtoken_1.default.verify(jwtToken, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "Invalid token" });
            }
            const user = await login_1.UserSignUp.findOne({ email: decoded.email }, { __v: 0, password: 0, confirmPassword: 0 });
            res.json(user);
        });
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
exports.handleUserDetails = handleUserDetails;

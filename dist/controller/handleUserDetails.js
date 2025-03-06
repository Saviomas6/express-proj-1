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
exports.handleUserDetails = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login_1 = require("../model/login");
const handleUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer ")) {
            res.status(401).json({ message: "Missing or invalid token" });
        }
        const jwtToken = token === null || token === void 0 ? void 0 : token.split(" ")[1];
        jsonwebtoken_1.default.verify(jwtToken, process.env.SECRET_KEY, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(401).json({ message: "Invalid token" });
            }
            const user = yield login_1.UserSignUp.findOne({ email: decoded.email }, { __v: 0, password: 0, confirmPassword: 0 });
            res.json(user);
        }));
    }
    catch (err) {
        const response = {
            success: false,
            status: "error",
            message: err.message,
        };
        res.status(500).json(response);
    }
});
exports.handleUserDetails = handleUserDetails;

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
exports.handleUserSignUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const login_1 = require("../model/login");
const handleUserSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, email, password, confirmPassword, bio, profileUrl, bannerUrl, joinedDate, } = req.body;
    try {
        const existUser = yield login_1.UserSignUp.findOne({ email });
        if (existUser) {
            res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const confirmHashPassword = yield bcrypt_1.default.hash(confirmPassword, 10);
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
});
exports.handleUserSignUp = handleUserSignUp;
//# sourceMappingURL=handleUserSignUp.js.map
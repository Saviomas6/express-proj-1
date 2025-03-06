"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const config_1 = require("./config/config");
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
app.use("/api/users", userRouter_1.default);
const startServer = async () => {
    try {
        const response = await (0, config_1.connectDB)();
        if (response) {
            console.log("Connection successful");
        }
        app.listen(PORT, () => {
            console.log("App listening on port 8081!");
        });
    }
    catch (e) {
        console.log(e);
    }
};
startServer();

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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const config_1 = require("./config/config");
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*", // Use specific origins in production
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Needed if using cookies
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
app.use(userRouter_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, config_1.connectDB)();
        if (response) {
            console.log("Connection successful");
        }
        app.listen(PORT, () => {
            console.log("App listening on port 5000!");
        });
    }
    catch (e) {
        console.log(e);
    }
});
startServer();
//# sourceMappingURL=index.js.map
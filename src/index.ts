import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/config";
import userRouter from "./routes/userRouter";

const app = express();
app.use(
  cors({
    origin: "*", // Use specific origins in production
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Needed if using cookies
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(userRouter);

const startServer = async () => {
  try {
    const response = await connectDB();
    if (response) {
      console.log("Connection successful");
    }
    app.listen(PORT, () => {
      console.log("App listening on port 5000!");
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();

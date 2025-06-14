import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';
import userRoutes from  "./routes/user.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from 'path';
dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

const corsOption =  {
    origin:'http://localhost:5173',
    credentials :true
}

app.use(cors(corsOption));
app.use("/api/auth", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use(express.static(path.join(__dirname, "./frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})
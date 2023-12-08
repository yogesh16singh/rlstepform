import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors";

const app = express();

app.use(express.json());

app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cookieParser());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//routes import
import userRouter from './routes/user.routes.js'


//routes declaration
app.use("/api/v1/users", userRouter)

// http://localhost:8000/api/v1/users/register

export { app }
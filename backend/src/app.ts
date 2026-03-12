import express from "express";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
mongoose.set('strictQuery', true);

import userRoutes from "./routers/user";
import authRoutes from "./routers/auth";
import quizRoutes from "./routers/quiz";
import examRoutes from "./routers/exam";
import reportRoutes from "./routers/report";

import ProjectError from "./helpers/error";
import { ReturnResponse } from "./interfaces/interfaces";

const app = express();

const connectionString = process.env.CONNECTION_STRING || "";
const port = process.env.PORT;


app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
))

declare global {
    namespace Express {
        interface Request {
            userId: String;
        }
    }
}

app.get('/health', (req, res) => {
    res.status(200).send('Server working.');
})

app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.use("/quiz", quizRoutes);

app.use("/exam", examRoutes);

app.use("/report", reportRoutes);

//Error Handler
app.use(
    (err: ProjectError, req: Request, res: Response, next: NextFunction) => {
        // email to corresponding email
        // logger for err

        let message: string;
        let statusCode: number;

        if (err.statusCode && err.statusCode < 500) {
            message = err.message;
            statusCode = err.statusCode;
        } else {
            message = "Something went wrong please try after sometime!";
            statusCode = 500;
        }

        let resp: ReturnResponse = { status: "error", message, data: {} };
        if (!!err.data) {
            resp.data = err.data;
        }
        res.status(statusCode).send(resp);
        next();
    }
);


const connectToDatabase = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log('Database connected successfully!');

        app.listen(port, () => {
            console.log('Server is running on port!', port);
        });

    }
    catch (error) {
        console.error(error);
    }
}

connectToDatabase();

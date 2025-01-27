import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 8000;

import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRouter);

app.use("/api/admin", adminRouter);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port} `));

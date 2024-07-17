import express from "express";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb" }));
app.use(express.static("public"));


import userRouter from './routes/user.route.js'
app.use("/api/v1/users", userRouter)

app.use(errorMiddleware);

export default app;

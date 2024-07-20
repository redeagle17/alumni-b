import express from "express";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["POST", "GET"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb" }));
app.use(express.static("public"));

import userRouter from "./routes/user.route.js";
import UserProfileRouter from "./routes/user.profile.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/users_data", UserProfileRouter);

app.use(errorMiddleware);

export default app;

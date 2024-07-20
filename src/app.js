import express from "express";
import errorMiddleware from "./middlewares/error.middleware.js";
import cors from "cors";

const app = express();

const corsOptions = {
  origin:
    "https://alumniconnectfrontend-8n00frrxw-ankur-singhs-projects-b0407e94.vercel.app",
  methods: "POST, GET",
  credential: true,
};
app.use(cors(corsOptions));

app.use(express.json());

import userRouter from "./routes/user.route.js";
import UserProfileRouter from "./routes/user.profile.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/users_data", UserProfileRouter);

app.use(errorMiddleware);

export default app;

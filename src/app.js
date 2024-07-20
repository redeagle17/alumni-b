import express from "express";
import errorMiddleware from "./middlewares/error.middleware.js";
import cors from "cors";

const app = express();

const corsOptions = {
  origin:
    "https://alumniconnectfrontend-8n00frrxw-ankur-singhs-projects-b0407e94.vercel.app",
  credentials: true,
  methods: ["POST", "GET", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://alumniconnectfrontend-8n00frrxw-ankur-singhs-projects-b0407e94.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.options("*", (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://alumniconnectfrontend-8n00frrxw-ankur-singhs-projects-b0407e94.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

app.use(express.json());

import userRouter from "./routes/user.route.js";
import UserProfileRouter from "./routes/user.profile.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/users_data", UserProfileRouter);

app.use(errorMiddleware);

export default app;

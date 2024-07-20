import "dotenv/config";
import connectDB from "./db/index.js";
import app from "./app.js";

const corsOptions = {
  origin: ["https://alumniconnectfrontend-8n00frrxw-ankur-singhs-projects-b0407e94.vercel.app"],
  credentials: true,
  methods: ["POST", "GET"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`SERVER is running at PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB connection failed", error);
  });

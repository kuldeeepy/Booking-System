import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./model/dbConfig.js";
import router from "./routes/allRoutes.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/v1", router);

app.get("/health", (req, res) => {
  res.status(200).json({ success: "Health is Ok" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening to port ${process.env.PORT}`);
});

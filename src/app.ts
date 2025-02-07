import express, {Request, Response} from "express";
import dotenv from "dotenv";
import router from "./routes";

const app = express();

dotenv.config(); // Load .env file

const PORT = process.env.PORT || 3000;

app.use('/api',router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;


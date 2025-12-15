import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorMiddleware";
import apiRouter from "./routes/apiRoutes";
import cors from "cors";
import { FRONTEND_URL } from "./config/serverConfig";

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true
  })
)

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/api", apiRouter);

app.use("/ping", (req, res) => {
  res.send("Pong");
});

// Use error handler as the last middleware
app.use(errorHandler);

export default app;

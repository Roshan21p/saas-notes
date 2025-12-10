import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorMiddleware";
import apiRouter from "./routes/apiRoutes";

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true}));

app.use('/api', apiRouter);

app.use('/ping', (req,res) => {
    res.end('Pong');
})

app.use(morgan('dev'));

// Use error handler as the last middleware
app.use(errorHandler);

export default app;
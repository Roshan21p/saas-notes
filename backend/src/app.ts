import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true}));

app.use(morgan('dev'));

app.use('/ping', (req,res) => {
    res.end('Pong');
})

// Use error handler as the last middleware
app.use(errorHandler);

export default app;
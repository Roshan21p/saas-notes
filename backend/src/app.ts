import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true}));

app.use(morgan('dev'));

app.use('/ping', (req,res) => {
    res.end('Pong');
})

export default app;
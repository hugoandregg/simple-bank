import express from "express";
import bodyParser from "body-parser";
import accountRouter from "./../routes/account";
import indexRouter from "./../routes/index";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/account", accountRouter);

export default app;

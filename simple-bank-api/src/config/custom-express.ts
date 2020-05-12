import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

import accountRouter from "../routes/account";
import indexRouter from "../routes/index";
import authRouter from "../routes/auth";
import userRouter from "../routes/user";

const app = express();
app.use(cors());
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/account", accountRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

export default app;

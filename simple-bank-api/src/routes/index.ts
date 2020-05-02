import express from "express";

const router = express.Router();

const sayHelloTo = (name: string): string => `Hello ${name}!`;

router.get("/", (_, res) => res.send(sayHelloTo("World")));

export default router;

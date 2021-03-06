import { Router } from "express";

const router = Router();

const sayHelloTo = (name: string): string => `Hello ${name}!`;

router.get("/", (_, res) => res.send(sayHelloTo("World")));

router.get("/test", async (req, res) => {
  res.json({ message: "pass!" });
});

export default router;

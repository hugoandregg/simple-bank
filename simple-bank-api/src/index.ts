import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./config/custom-express";

async function startApp() {
  const port = process.env.SERVER_PORT;
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

createConnection()
  .then(async () => startApp())
  .catch((error) => console.log(error));

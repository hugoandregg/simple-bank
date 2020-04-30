import "reflect-metadata";
import {createConnection, getRepository, getConnection, Connection} from "typeorm";
import app from './config/custom-express'

async function startApp() {
    const port = 3000;
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

createConnection()
    .then(async connection => startApp())
    .catch(error => console.log(error));


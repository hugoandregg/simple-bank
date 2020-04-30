import "reflect-metadata";
import {createConnection, getRepository, getConnection, Connection} from "typeorm";
import app from './config/custom-express'
import accountRouter from './routes/account'
import indexRouter from './routes/index'

const main = async (connection: Connection) => {
    app.use('/', indexRouter);
    app.use('/account', accountRouter);

    const port = 3000;
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

createConnection()
    .then(async connection => main(connection))
    .catch(error => console.log(error));


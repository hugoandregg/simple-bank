import app from './config/custom-express'
import bankRouter from './routes/bank'
import indexRouter from './routes/index'
import bodyParser from 'body-parser'

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/test', bankRouter);

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
import ENV from './config/env';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { categoriesRouter } from './main/main.routes';
import handlers from './handlers/request.handler';
import databaseConnection from './config/database';
import JSONWebToken from './helpers/jwt';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('short'));
app.use(cors({ origin: '*' }));

app.use('/', async (req, res, next) => {
  try {
    const endpoints: string[] = ['categories'];
    let requireToken = false;
    endpoints.forEach(item => req.url.includes(item) ? (requireToken = true) : null);
    if (requireToken) {
      const validateSession: boolean = await JSONWebToken.verifyToken(req, res);
      if (validateSession) {
        return next();
      } else {
        return handlers(res, 401, { error: 'Unauthorized.' });
      }
    }
  } catch (err) {
    return handlers(res, 404, { error: 'Error connection', err });
  }
  return next();
})
app.use('/api/v1/categories', categoriesRouter);

app.listen(ENV.PORT, async (err?: Error) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening at http://localhost:${ENV.PORT}/categories`);
});

databaseConnection.sync({ alter: true });
databaseConnection.authenticate().then(() => {
  console.log('Database connected!!');
}).catch(err => console.log(err));

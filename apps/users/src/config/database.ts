import ENV from './env';

import { Sequelize } from 'sequelize';
import GlobalModels from '../models/models';

const databaseConnection = new Sequelize(ENV.DATABASE, ENV.USER, ENV.PASSWORD, {
  host: ENV.HOST || 'localhost',
  dialect: 'postgres',
  logging: false
});

const globalModels = new GlobalModels();
globalModels.setupModels(databaseConnection);

export default databaseConnection;

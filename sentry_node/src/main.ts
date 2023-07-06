require('dotenv').config();
import express from 'express';
import config from 'config';
import { AppDataSource } from './utilities/data-source';
import validateEnv from './utilities/validateEnv';
import { connectRedis } from './utilities/connectRedis';
import { loadMonitoringModule } from './utilities/swaggerStats';
import { sentryError } from './utilities/sentryError';
import RouteConfiguration from './api';
import { handleGlobalErrors, healthCheck, useCors, useLogger } from './utilities/service-config';


AppDataSource.initialize().then(async () => {
  // VALIDATE ENV
  validateEnv();

  const app = express();

  // TEMPLATE ENGINE
  app.set('view engine', 'pug');
  app.set('views', `${__dirname}/views`);

  // MIDDLEWARE

  // 1. Body parser
  app.use(express.json({ limit: '100kb' }));

  await useLogger(app);

  await useCors(app);

  await connectRedis();

  await loadMonitoringModule(app);

  await RouteConfiguration(app);

  await healthCheck(app);

  await handleGlobalErrors(app);

  await sentryError(app);

  app._router.stack.forEach(route => {
    if (route.route && route.route.path) {
      console.log(route.route.path);
    }
  });

  const port = config.get<number>('port');
  app.listen(port);

  console.log(`Server started with pid: ${process.pid} on port: ${port}`);
}).catch((e) => console.log(e))



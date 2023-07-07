import * as Sentry from '@sentry/node';
import dotenv from 'dotenv';

dotenv.config();
export const sentryError = async(app)=>{
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  tracesSampleRate: 1.0,
});

Sentry.configureScope((scope) => {
  scope.setTags({
    environment: 'production',
    project: 'route_plan',
  });
});

// export const sentryError = async (app: express.Application) => {
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());

  
};

export { Sentry };

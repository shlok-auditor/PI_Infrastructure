import * as Sentry from '@sentry/node';
require('dotenv').config();

export const sentryError = async(app)=>{
    try {
        Sentry.init({
            dsn: process.env.SENTRY_DNS,
            integrations: [
              // enable HTTP calls tracing
              new Sentry.Integrations.Http({ tracing: true }),
              // enable Express.js middleware tracing
              new Sentry.Integrations.Express({ app }),
              // Automatically instrument Node.js libraries and frameworks
              ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
            ],
          
            // Set tracesSampleRate to 1.0 to capture 100%
            // of transactions for performance monitoring.
            // We recommend adjusting this value in production
            tracesSampleRate: 1.0,
          });

          
          Sentry.configureScope((scope) => {
            scope.setTags({
              environment: 'production',
              project: 'route_plan',
            });
          });
        // RequestHandler creates a separate execution context, so that all
        // transactions/spans/breadcrumbs are isolated across requests
        app.use(Sentry.Handlers.requestHandler());
        // TracingHandler creates a trace for every incoming request    
        app.use(Sentry.Handlers.tracingHandler());

        // The error handler must be before any other error middleware and after all controllers
        app.use(Sentry.Handlers.errorHandler());

        

        app.use(function onError(err, req, res, next) {
            // The error id is attached to `res.sentry` to be returned
            // and optionally displayed to the user for support.
            res.statusCode = 500;
            res.end(res.sentry + "\n");
          });
    } catch (error) {
        console.log(error);        
    }
}
export { Sentry };


import { validate } from '../middleware/validate';
import { createUserSchema, loginUserSchema } from './schemas/user.schema';
import {loginUserHandler, logoutHandler, refreshAccessTokenHandler, testTwo,registerUserHandler } from './routes/auth';
import { createOrgSchema } from './schemas/org.schema';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { registerOrganization } from './routes/organization';
import { routePlanner } from './routes/routeplan';
import multer  from 'multer';
import { sentryError, Sentry } from '../middleware/sentryError';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });
const uploads = multer().single('jsonFile');

export default async (app: any) => {

  app.post('/register', validate(createUserSchema), registerUserHandler);

  // Login user
  app.post('/login', validate(loginUserSchema), loginUserHandler);

  // Logout user
  app.get('/logout', deserializeUser, requireUser, logoutHandler);

  // Refresh access token
  app.get('/refresh', refreshAccessTokenHandler);

  app.post('/api/auth/register', validate(createUserSchema), registerUserHandler);
  app.get('/api/auth/login', validate(loginUserSchema), loginUserHandler);
  app.post('/api/org/register', validate(createOrgSchema), registerOrganization);

  app.post('/api/getRoutePath',uploads,routePlanner.getRoutePath);
  app.get('/api/testOne',routePlanner.testOne);
  app.get('/api/testTwo',testTwo);
}





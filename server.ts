import 'dotenv/config';
import App from './app';
import AuthenticationController from './authentication/authentication.controller';
import HealthCheckController from './healthCheck/healthCheck.controller';
import UserController from './user/user.controller';

const app = new App(
  [
    new AuthenticationController(),
    new UserController(),
    new HealthCheckController()
  ],
);

app.listen();

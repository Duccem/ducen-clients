import { HealthController } from '../controllers/health.controller';
import { HooksController } from '../controllers/hooks.controller';
import { OAuthController } from '../controllers/oauth.controller';

export const controllers = [OAuthController, HooksController, HealthController];

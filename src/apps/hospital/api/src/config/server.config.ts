import { registerAs } from '@nestjs/config';

export default registerAs('server', () => {
  return {
    port: process.env.PORT || 3000,
    host: process.env.HOST || ' http://localhost',
    globalPrefix: process.env.GLOBAL_PREFIX || 'api',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:4200',
  };
});

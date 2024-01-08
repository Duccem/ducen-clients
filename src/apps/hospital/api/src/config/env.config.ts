import { CustomLogger } from 'core';
import { config } from 'dotenv';
import { resolve } from 'path';

config();

const logger = new CustomLogger();

export function getEnv() {
  let env = 'dev.env';
  switch (process.env['NODE' + '_ENV']) {
    case 'dev':
      env = 'dev.env';
      break;
    case 'testing':
      env = 'testing.env';
      break;
    case 'local':
      env = 'local.env';
      break;
    case 'docker':
      env = 'docker.env';
  }

  const path = resolve(process.cwd(), 'src/environments', env);

  logger.log(`Selected env: ${env}`);
  logger.log(`Env file path: ${path}`);

  return path;
}

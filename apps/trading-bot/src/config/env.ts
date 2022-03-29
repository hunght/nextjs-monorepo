function getEnvStringValue(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.log(`==== Missing ENV ===`);
    console.error(name);
    console.log('==== end log ===');

    return '';
  }

  return value;
}

export const THREE_COMMAS_SECRET_KEY = getEnvStringValue(
  'THREE_COMMAS_SECRET_KEY'
);
export const PRISMA_DATABASE_URL = getEnvStringValue('PRISMA_DATABASE_URL');
export const NODE_ENV = getEnvStringValue('NODE_ENV');

export const THREE_COMMAS_API_KEY = getEnvStringValue('THREE_COMMAS_API_KEY');
export const LUNARCRUSH_API_KEY = getEnvStringValue('LUNARCRUSH_API_KEY');
export const SLACK_APP_TOKEN = getEnvStringValue('SLACK_APP_TOKEN');
export const LUNARCRUSH_URL = 'https://api.lunarcrush.com/v2';

export const SMTP_HOST = getEnvStringValue('SMTP_HOST');
export const SMTP_PORT = parseInt(getEnvStringValue('SMTP_PORT'));
export const SMTP_USER = getEnvStringValue('SMTP_USER');
export const SMTP_PASSWORD = getEnvStringValue('SMTP_PASSWORD');
export const SMTP_FROM_EMAIL_NO_REPLY = getEnvStringValue(
  'SMTP_FROM_EMAIL_NO_REPLY'
);
export const SMTP_FROM_NAME = getEnvStringValue('SMTP_FROM_NAME');
export const EMAIL_SERVER = `smtp://${SMTP_USER}:${SMTP_PASSWORD}@${SMTP_HOST}:${SMTP_PORT}`;

export const GOOGLE_CLIENT_ID = getEnvStringValue('GOOGLE_CLIENT_ID');
export const GOOGLE_CLIENT_SECRET = getEnvStringValue('GOOGLE_CLIENT_SECRET');
export const GOOGLE_REDIRECT_URI = getEnvStringValue('GOOGLE_REDIRECT_URI');
export const GOOGLE_REFRESH_TOKEN = getEnvStringValue('GOOGLE_REFRESH_TOKEN');

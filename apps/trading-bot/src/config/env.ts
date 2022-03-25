export const PRISMA_DATABASE_URL = process.env?.PRISMA_DATABASE_URL;
export const THREE_COMMAS_SECRET_KEY = process.env?.THREE_COMMAS_SECRET_KEY;
export const THREE_COMMAS_API_KEY = process.env?.THREE_COMMAS_API_KEY;
export const LUNARCRUSH_API_KEY = process.env?.LUNARCRUSH_API_KEY;
export const SLACK_APP_TOKEN = process.env?.SLACK_APP_TOKEN;
export const LUNARCRUSH_URL = 'https://api.lunarcrush.com/v2';

export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PORT = parseInt(process.env.SMTP_PORT ?? '0');
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
export const SMTP_FROM_EMAIL_NO_REPLY = process.env.SMTP_FROM_EMAIL_NO_REPLY;
export const STMP_FROM_NAME = process.env.STMP_FROM_NAME;
export const EMAIL_SERVER = `smtp://${SMTP_USER}:${SMTP_PASSWORD}@${SMTP_HOST}:${SMTP_PORT}`;

import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import type * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import {
  SMTP_FROM_EMAIL_NO_REPLY,
  SMTP_FROM_NAME,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GOOGLE_REFRESH_TOKEN,
} from '@/config/env';

const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

export const sendEmail = async (options: {
  email: string;
  subject: string;
  message: string;
}): Promise<SMTPTransport.SentMessageInfo> => {
  const { token } = await oAuth2Client.getAccessToken();
  if (!token) {
    throw Error('Can not get access token for google oauth');
  }
  const nodemailerOptions: SMTPTransport.Options = {
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: SMTP_FROM_EMAIL_NO_REPLY,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken: token,
    },
  };
  const transporter = nodemailer.createTransport(nodemailerOptions);

  const message = {
    from: `${SMTP_FROM_NAME} < ${SMTP_FROM_EMAIL_NO_REPLY}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  return await transporter.sendMail(message);
};

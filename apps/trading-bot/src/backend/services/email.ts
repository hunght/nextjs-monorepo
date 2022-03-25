import nodemailer from 'nodemailer';
import type * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  SMTP_FROM_EMAIL_NO_REPLY,
  STMP_FROM_NAME,
} from '@/config/env';

// some code here...

const nodemailerOptions: SMTPTransport.Options = {
  host: SMTP_HOST,
  port: SMTP_PORT,

  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
};
const sendEmail = async (options: {
  email: string;
  subject: string;
  message: string;
}) => {
  const transporter = nodemailer.createTransport(nodemailerOptions);

  const message = {
    from: `${STMP_FROM_NAME} < ${SMTP_FROM_EMAIL_NO_REPLY}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};

export default sendEmail;

import { google } from 'googleapis';
import type { EmailConfig } from 'next-auth/providers';
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
  const nodemailerOptions: SMTPTransport.Options = await getNodemailerOptions();
  const transporter = nodemailer.createTransport(nodemailerOptions);

  const message = {
    from: `${SMTP_FROM_NAME} < ${SMTP_FROM_EMAIL_NO_REPLY}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  return await transporter.sendMail(message);
};

async function getNodemailerOptions(): Promise<SMTPTransport.Options> {
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
  return nodemailerOptions;
}

export async function sendVerificationRequest({
  identifier: email,
  url,
  provider: { from },
}: {
  identifier: string;
  url: string;
  expires: Date;
  provider: EmailConfig;
  token: string;
}) {
  try {
    const { host } = new URL(url);
    const nodemailerOptions: SMTPTransport.Options =
      await getNodemailerOptions();
    const transport = nodemailer.createTransport(nodemailerOptions);
    const data = await transport.sendMail({
      to: email,
      from,
      subject: `Sign in to ${host}`,
      text: text({ url, host }),
      html: html({ url, host, email }),
    });
    console.log(`==== data ===`);
    console.log(data);
    console.log('==== end log ===');
  } catch (error) {
    console.log(`==== error ===`);
    console.log(error);
    console.log('==== end log ===');
  }
}

// Email HTML body
function html({ url, host, email }: Record<'url' | 'host' | 'email', string>) {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`;
  const escapedHost = `${host.replace(/\./g, '&#8203;.')}`;

  // Some simple styling options
  const backgroundColor = '#f9f9f9';
  const textColor = '#444444';
  const mainBackgroundColor = '#ffffff';
  const buttonBackgroundColor = '#346df1';
  const buttonBorderColor = '#346df1';
  const buttonTextColor = '#ffffff';

  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>${escapedHost}</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        Sign in as <strong>${escapedEmail}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Sign in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: Record<'url' | 'host', string>) {
  return `Sign in to ${host}\n${url}\n\n`;
}

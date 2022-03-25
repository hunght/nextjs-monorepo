// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
import { WebClient, LogLevel } from '@slack/web-api';
import { SLACK_APP_TOKEN } from '@/config/env';

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
export const slackClient = new WebClient(SLACK_APP_TOKEN, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG,
});
// ID of the channel you want to send the message to
export const channelId = 'CF9SVF0A3';

import Mail from "nodemailer/lib/mailer";
import { SendMailOptions, SentMessageInfo } from "nodemailer";
import * as nodemailer from "nodemailer";
import { IServerInfo } from "./ServerInfo";
import { access } from "fs";
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "798659017115-5eopdp133ejh75bnng7r2q3pplcme7ag.apps.googleusercontent.com", // ClientID
  "vvNvHE_pQ0RNS6Lr-8g2odfr", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token:
    "1//04fA6Hb3hfFoGCgYIARAAGAQSNwF-L9Ir8HE5nUjIMVRHIpaQxndKOU9vQLQBTXkoOpsDHRYkiqQRZ48Une37fehF8LIKwtN1q9U",
});
const accessToken = oauth2Client.getAccessToken();

export class Worker {
  private static serverInfo: IServerInfo;
  constructor(inServerInfo: IServerInfo) {
    Worker.serverInfo = inServerInfo;
  }
  public sendMessage(inOptions: SendMailOptions): Promise<string> {
    return new Promise((inResolve, inReject) => {
      const transport: Mail = nodemailer.createTransport(
        Worker.serverInfo.smtp,
        accessToken
      );
      transport.sendMail(
        inOptions,
        (inError: Error | null, inInfo: SentMessageInfo) => {
          if (inError) {
            inReject(inError);
          } else {
            inResolve();
          }
        }
      );
    });
  }
}

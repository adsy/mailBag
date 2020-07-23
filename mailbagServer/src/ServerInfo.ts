const path = require("path");
const fs = require("fs");

export interface IServerInfo {
  smtp: {
    host: string;
    port: number;
    auth: { user: string; pass: string };
  };
  imap: {
    host: string;
    port: number;
    auth: { user: string; pass: string };
  };
}

export let ServerInfo: IServerInfo;

const rawInfo: string = fs.readFileSync(
  path.join(__dirname, "../serverInfo.json")
);
ServerInfo = JSON.parse(rawInfo);

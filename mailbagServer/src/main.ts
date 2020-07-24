import path from "path";
import express, {
  Express,
  NextFunction,
  Request,
  Response,
  response,
} from "express";
import { ServerInfo } from "./ServerInfo";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Contacts from "./contacts";
import { IContact } from "./contacts";
import { request } from "http";

const app: Express = express();

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../../client/dist")));

app.use(function (
  inRequest: Request,
  inResponse: Response,
  inNext: NextFunction
) {
  inResponse.header("Access-Control-Allow-Origin", "*");
  inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  inResponse.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  inNext();
});

app.get("/mailboxes", async (inRequest: Request, inResponse: Response) => {
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(ServerInfo);
    const mailboxes: IMAP.IMailBox[] = await imapWorker.listMailboxes();
    inResponse.json(mailboxes);
  } catch (inError) {
    inResponse.send("error");
  }
});

app.get(
  "/mailboxes/:mailbox",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(ServerInfo);
      const messages: IMAP.IMessage[] = await imapWorker.listMessages({
        mailbox: inRequest.params.mailbox,
      });
      inResponse.json(messages);
    } catch (inError) {
      inResponse.send("error");
    }
  }
);

app.get(
  "/mailboxes/:mailbox/:id",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(ServerInfo);
      const messageBody: string | undefined = await imapWorker.getMessageBody({
        mailbox: inRequest.params.mailbox,
        id: parseInt(inRequest.params.id, 10),
      });
      inResponse.json(messageBody);
    } catch (inError) {
      inResponse.send("error");
    }
  }
);

app.delete(
  "/mailboxes/:mailbox/:id/",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(ServerInfo);
      console.log("here");
      await imapWorker.deleteMessages({
        mailbox: inRequest.params.mailbox,
        id: parseInt(inRequest.params.id, 10),
        destination: "[Gmail]/Trash",
      });
      inResponse.send("message deleted");
    } catch (inError) {
      inResponse.send("error");
    }
  }
);

app.post("/mailboxes", async (inRequest: Request, inResponse: Response) => {
  try {
    const smtpWorker: SMTP.Worker = new SMTP.Worker(ServerInfo);
    await smtpWorker.sendMessage(inRequest.body);
    inResponse.send("message sent");
  } catch (inError) {
    inResponse.send("error");
  }
});

app.get("/contacts", async (inRequest: Request, inResponse: Response) => {
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contacts: IContact[] = await contactsWorker.listContacts();
    inResponse.json(contacts);
  } catch (inError) {
    inResponse.send("error");
  }
});

app.post("/contacts", async (inRequest: Request, inResponse: Response) => {
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contact: IContact = await contactsWorker.addContact(inRequest.body);
    inResponse.json(contact);
  } catch (inError) {
    inResponse.send("error");
  }
});

app.delete(
  "/contacts/:id",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      await contactsWorker.deleteContact(inRequest.params.id);
      inResponse.send("contact deleted");
    } catch (inError) {
      inResponse.send("error");
    }
  }
);

app.listen(3000, () =>
  console.log(`Example app listening at http://localhost:3000`)
);

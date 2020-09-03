//Style imports
import "normalize.css";
import "../css/main.css";
//React
import React from "react";
import ReactDom from "react-dom";

import { ImagePalette } from "material-ui/svg-icons";
//Worker Classes
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Contacts from "./Contacts";
//Components
import BaseLayout from "../components/BaseLayout";

const baseComponent = ReactDom.render(
  <BaseLayout />,
  document.getElementById("root")
);

baseComponent.state.showHidePleaseWait(true);

async function getMailboxes() {
  const IMapWorker: IMAP.Worker = new IMAP.Worker();
  const mailboxes: IMAP.IMailbox[] = await IMapWorker.listMailboxes();
  mailboxes.forEach(inMailbox => {
    baseComponent.state.addMailBoxToList(inMailbox);
  });
}

getMailboxes().then(function() {
  async function getContacts() {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contacts: Contacts.IContact[] = await contactsWorker.listContacts();
    contacts.forEach(inContact => {
      baseComponent.state.addContactToList(inContact);
    });
  }
  getContacts().then(baseComponent.state.getMessages("INBOX"));
});

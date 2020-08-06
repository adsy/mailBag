import * as IMAP from "./IMAP";
import * as Contacts from "./Contacts";
import { config } from "./config";
import { ComponentNameToClassKey } from "@material-ui/core/styles/overrides";

export function createState(inParentComponent) {
  return {
    pleaseWaitVisible: false,
    contacts: [],
    mailboxes: [],
    messages: [],
    currentView: "welcome",
    currentMailbox: null,
    messageID: null,
    messageDate: null,
    messageFrom: null,
    messageTo: null,
    messageSubject: null,
    messageBody: null,
    contactID: null,
    contactName: null,
    contactEmail: null,

    showHidePleaseWait: function(inVisible: boolean): void {
      this.setState({ pleaseWaitVisible: inVisible });
    }.bind(inParentComponent),

    addMailBoxToList: function(inMailBox: IMAP.IMailbox): void {
      const cl: IMAP.IMailbox[] = this.state.mailboxes.slice(0);
      cl.push(inMailBox);
      this.setState({ mailboxes: cl });
    }.bind(inParentComponent),

    addContactToList: function(inContact: Contacts.IContact): void {
      const cl = this.state.contacts.slice(0);
      cl.push({
        _id: inContact._id,
        name: inContact[Object.keys(inContact)[0]].name,
        email: inContact[Object.keys(inContact)[0]].email
      });
      this.setState({ contacts: cl });
    }.bind(inParentComponent),

    showComposeMessage: function(inType: string): void {
      switch (inType) {
        case "new":
          this.setState({
            currentView: "compose",
            message: "",
            messageSubject: "",
            messageBody: "",
            messageFrom: config.userEmail
          });
          break;
        case "reply":
          this.setState({
            currentView: "compose",
            message: this.state.messageFrom,
            messageSubject: `RE:${this.state.messageSubject}`,
            messageBody: `\n\n---- Original Message ----\n\n${this.state.messageBody}`,
            messageFrom: config.userEmail
          });
          break;
        case "contact":
          this.setState({
            currentView: "compose",
            messageTo: this.state.contactEmail,
            messageSubject: "",
            messageBody: "",
            messageFrom: config.userEmail
          });
          break;
      }
    }.bind(inParentComponent),

    showAddContact: function(): void {
      this.setState({
        currentView: "contactAdd",
        contactID: null,
        contactName: "",
        contactEmail: ""
      });
    }.bind(inParentComponent),

    setCurrentMailbox: function(inPath: String): void {
      this.setState({ currentView: "welcome", currentMailbox: inPath });

      console.log(this.state.currentMailbox);
      this.state.getMessages(inPath);
    }.bind(inParentComponent),

    getMessages: async function(inPath: string): Promise<void> {
      console.log("state.getMessages()");

      this.state.showHidePleaseWait(true);
      const imapWorker: IMAP.Worker = new IMAP.Worker();
      const messages: IMAP.IMessage[] = await imapWorker.listMessages(inPath);
      this.state.showHidePleaseWait(false);

      this.state.clearMessages();
      messages.forEach((inMessage: IMAP.IMessage) => {
        this.state.addMessageToList(inMessage);
      });
    }.bind(inParentComponent),

    clearMessages: function(): void {
      this.setState({ messages: [] });
    }.bind(inParentComponent),

    addMessageToList: function(inMessage: IMAP.IMessage): void {
      const cl = this.state.messages.slice(0);
      cl.push({
        id: inMessage.id,
        date: inMessage.date,
        from: inMessage.from,
        subject: inMessage.subject
      });
      this.setState({ messages: cl });
    }.bind(inParentComponent),

    showContact: function(inID: string, inName: string, inEmail: string): void {
      this.setState({
        curretView: "contact",
        contactID: inID,
        contactName: inName,
        contactEmail: inEmail
      });
    }.bind(inParentComponent),

    fieldChangeHandler: function(inEvent: any): void {
      console.log(inEvent);
      if (
        inEvent.target.id === "contactName" &&
        inEvent.target.value.length > 16
      ) {
        return;
      }
      this.setState({ [inEvent.target.id]: inEvent.target.value });
    }.bind(inParentComponent),

    saveContact: async function(): Promise<void> {
      const cl = this.state.contacts.slice(0);
      this.state.showHidePleaseWait(true);
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      const contact: Contacts.IContact = await contactsWorker.addContact({
        name: this.state.contactName,
        email: this.state.contactEmail
      });
      this.state.showHidePleaseWait(false);
      cl.push(contact);
      this.setState({
        contacts: cl,
        contactID: null,
        contactName: null,
        contactEmail: null
      });
    }.bind(inParentComponent),

    deleteContact: async function(): Promise<void> {
      this.state.showHidePleaseWait(true);
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      await contactsWorker.deleteContact(this.state.contactID);
      this.state.showHidePleaseWait(false);
      const cl = this.state.contacts.filter(
        inElement => inElement._id != this.state.contactID
      );
      this.setState({
        contacts: cl,
        contactID: null,
        contactName: "",
        contactEmail: ""
      });
    }.bind(inParentComponent)
  };
}

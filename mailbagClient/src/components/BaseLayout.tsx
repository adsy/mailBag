import { Component } from "react";
import { createState } from "../code/state";
import React from "react";
import {
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core";

//import components to add to BaseLayout
import Toolbar from "./Toolbar";
import MailboxList from "./mailboxList";
import MessageList from "./messageList";
// import WelcomeView from "./WelcomeView";
// import MessageView from "./MessageView";
import ContactView from "./contactsView";
import ContactsList from "./contactsList";
import LinearBuffer from "./LinearLoading";

class BaseLayout extends Component {
  state = createState(this);

  render() {
    return (
      <div className="appContainer">
        <Dialog
          open={this.state.pleaseWaitVisible}
          disableBackdropClick={true}
          transitionDuration={0}
        >
          <DialogTitle style={{ textAlign: "center" }}>
            LOADING - PLEASE WAIT
          </DialogTitle>
          <DialogContent>
            <LinearBuffer></LinearBuffer>
          </DialogContent>
        </Dialog>

        <div className="toolbar">
          <Toolbar state={this.state} />
        </div>

        <div className="mailboxList">
          <MailboxList state={this.state} />
        </div>

        <div className="centerArea">
          <div className="messageList">
            <MessageList state={this.state} />
          </div>

          <div className="centerViews">
            {/* {this.state.currentView === "welcome" && <WelcomeView />}
            {(this.state.currentView === "message" ||
              this.state.currentView === "compose") && (
              <MessageView state={this.state} />
            )}
            {(this.state.currentView === "contact" ||
              this.state.currentView === "contactAdd") && (
              <ContactView state={this.state} />
            )} */}
          </div>
        </div>
        <div className="contactsList">
          <ContactsList state={this.state} />
        </div>
      </div>
    );
  }
}

export default BaseLayout;

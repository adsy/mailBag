import React from "react";
import { Button } from "@material-ui/core";
import NewContactIcon from "@material-ui/icons/ContactMail";
import NewMessageIcon from "@material-ui/icons/Email";

const Toolbar = ({ state }) => (
  <div>
    <Button
      variant="contained"
      color="primary"
      size="small"
      style={{
        marginRight: 10,
        backgroundColor: "#347FC4"
      }}
      onClick={() => state.showComposeMessage("new")}
    >
      <NewMessageIcon style={{ marginRight: 10 }} />
      New Message
    </Button>
    <Button
      color="primary"
      variant="contained"
      size="small"
      style={{
        marginRight: 10,
        backgroundColor: "#347FC4"
      }}
      onClick={() => state.showAddContact}
    >
      <NewContactIcon style={{ marginRight: 10 }} />
      New Contact
    </Button>
  </div>
);

export default Toolbar;

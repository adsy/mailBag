// React imports.
import React from "react";
import Form from "@material-ui/core/FormControl";
import Chip from "@material-ui/core/Chip";
import { InputBase, TextField, FormLabel, Button } from "@material-ui/core";

const MessageView = ({ state }) => (
  <Form fullWidth={true}>
    {state.currentView === "message" && <h2> Message Contents </h2>}
    {state.currentView === "compose" && <h2> New Message </h2>}

    {state.currentView === "message" && (
      <TextField
        margin="dense"
        variant="outlined"
        fullWidth={true}
        label="Message ID"
        value={state.messageID}
        disabled={true}
        style={{}}
        InputProps={{ style: { color: "#000000" } }}
      />
    )}
    {state.currentView === "message" && <br />}

    {state.currentView === "message" && (
      <TextField
        margin="dense"
        variant="outlined"
        fullWidth={false}
        label="Date"
        value={state.messageDate}
        disabled={true}
        InputProps={{ style: { color: "#000000" } }}
      />
    )}
    {state.currentView === "message" && <br />}

    {state.currentView === "message" && (
      <TextField
        margin="dense"
        variant="outlined"
        fullWidth={true}
        label="From"
        value={state.messageFrom}
        disabled={true}
        InputProps={{ style: { color: "#000000" } }}
      />
    )}
    {state.currentView === "message" && <br />}

    {state.currentView === "compose" && (
      <TextField
        margin="dense"
        id="messageTo"
        variant="outlined"
        fullWidth={true}
        label="To"
        disabled={state.currentView === "message"}
        value={state.messageTo}
        InputProps={{ style: { color: "#000000" } }}
        onChange={state.fieldChangeHandler}
      />
    )}

    {state.currentView === "compose" && <br />}
    <TextField
      margin="dense"
      id="messageSubject"
      variant="outlined"
      fullWidth={true}
      label="Subject"
      disabled={state.currentView === "message"}
      value={state.messageSubject}
      inputProps={{ style: { color: "#000000" } }}
      onChange={state.fieldChangeHandler}
    />
    <br />

    <TextField
      margin="dense"
      label="Message Body"
      id="messageBody"
      variant="outlined"
      fullWidth={true}
      multiline={true}
      rows={12}
      value={state.messageBody}
      disabled={state.currentView === "message"}
      inputProps={{ style: { color: "#000000" } }}
      onChange={state.fieldChangeHandler}
    />

    {state.currentView === "compose" && (
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginTop: 10 }}
        onClick={state.sendMessage}
      >
        Send Message
      </Button>
    )}

    {state.currentView === "message" && (
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginTop: 10, marginRight: 10 }}
        onClick={() => state.showComposeMessage("reply")}
      >
        Reply
      </Button>
    )}

    {state.currentView === "message" && (
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ marginTop: 10 }}
        onClick={state.deleteMessage}
      >
        Delete
      </Button>
    )}
    <br />
  </Form>
);

export default MessageView;

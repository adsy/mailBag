// React imports.
import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const contactsView = ({ state }) => (
  <form>
    <TextField
      margin="dense"
      id="contactName"
      label="Name"
      value={state.contactName}
      variant="outlined"
      inputProps={{ style: { color: "#000000" } }}
      disabled={state.currentView === "contact"}
      style={{ width: 260 }}
      onChange={state.fieldChangeHandler}
    />
    <br />
    <TextField
      id="contactEmail"
      margin="dense"
      label="Email"
      value={state.contactEmail}
      variant="outlined"
      InputProps={{ style: { color: "#000000" } }}
      disabled={state.currentView === "contact"}
      style={{ width: 520 }}
      onChange={state.fieldChangeHandler}
    ></TextField>
    <br />

    {/* Conditional Render of the Save button */}
    {state.currentView === "contactAdd" && (
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginTop: 10 }}
        onChange={state.saveContact}
      >
        Save
      </Button>
    )}

    {/* Conditional Render of the Delete button */}
    {state.currentView === "contact" && (
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginTop: 10, marginRight: 10 }}
        onChange={state.deleteContact}
      >
        Delete
      </Button>
    )}

    {/* Conditional Render of the Sed EMail button */}
    {state.currentView === "contact" && (
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginTop: 10 }}
        onChange={state.showComposeMessage("contact")}
      >
        Send Email
      </Button>
    )}
  </form>
);

export default contactsView;

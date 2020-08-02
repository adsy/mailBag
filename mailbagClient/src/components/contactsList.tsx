// React imports.
import React from "react";

// Material-UI imports.
import List from "@material-ui/core/List";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from "@material-ui/core";
import Person from "@material-ui/icons/Person";

const contactsList = ({ state }) => (
  <List>
    {state.contacts.map(value => {
      return (
        <ListItem
          key={value}
          button
          onClick={() => state.showContact(value._id, value.name, value.email)}
        >
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText style={{ color: "white" }} primary={`${value.name}`} />
        </ListItem>
      );
    })}
  </List>
);

export default contactsList;

import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

interface SelectedDocumentsProps {
  file: string;
}

const SelectedDocuments: React.FC<SelectedDocumentsProps> = ({ file }) => {
  return (
    <div>
      <h3>Selected Documents</h3>
      <List>
        <ListItem>
          <ListItemText primary={file} />
        </ListItem>
      </List>
    </div>
  );
};

export default SelectedDocuments;

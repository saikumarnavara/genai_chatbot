import React from "react";
import { List, ListItem, ListItemText, Box, Typography } from "@mui/material";

interface SelectedDocumentsProps {
  file: string;
}

const SelectedDocuments: React.FC<SelectedDocumentsProps> = ({ file }) => {
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "background.default",
        borderRadius: 2,
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: "bold", color: "text.primary" }}
      >
        Selected Document
      </Typography>
      <List
        sx={{
          width: "100%",
          backgroundColor: "background.paper",
          borderRadius: 1,
        }}
      >
        <ListItem
          sx={{
            padding: 2,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: 1,
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              transform: "scale(1.02)",
            },
          }}
        >
          <ListItemText
            primary={file}
            primaryTypographyProps={{
              fontSize: "1rem",
              fontWeight: "500",
              color: "text.primary",
            }}
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default SelectedDocuments;

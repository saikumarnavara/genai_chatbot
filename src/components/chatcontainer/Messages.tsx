import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import Markdown from "marked-react";

interface Message {
  message: string;
  sender: "bot" | "user";
}

const ChatMessages: React.FC = () => {
  const { messages } = useSelector((state: any) => state.chat);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 1,
        height: "100%",
        overflowY: "auto",
        bgcolor: "background.default",
        minWidth: { xs: "100%", sm: "600px", md: "800px" },
        maxHeight: "330px",
        minHeight: "330px",
      }}
    >
      {messages.map((msg: Message, index: number) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
            mb: 0.5, // Reduced margin
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: "100%", sm: "75%", md: "70%" },
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              bgcolor: msg.sender === "user" ? "primary.main" : "grey.300",
              color:
                msg.sender === "user" ? "primary.contrastText" : "text.primary",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                textAlign: msg.sender === "user" ? "right" : "left",
                overflowWrap: "break-word",
              }}
            >
              <Markdown>{msg.message}</Markdown>
            </Typography>
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.25 }} // Reduced margin-top for caption
          >
            {msg.sender === "user" ? "You" : "Bot"}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ChatMessages;

import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Markdown from "marked-react";
import SuggestivePrompts from "./SuggestivePrompts";

interface Message {
  message: string;
  sender: "bot" | "user";
}

const ChatMessages: React.FC = () => {
  const theme = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { messages, prompts } = useSelector((state: any) => state.chat);

  const lastBotMessageIndex = messages
    .map((msg: Message) => msg.sender)
    .lastIndexOf("bot");

  // Auto-scroll to the latest message or prompt suggestion
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, prompts]); // Depend on both messages and prompts

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 1,
        height: "100%",
        overflowY: "auto",
        bgcolor: "background.default",
        width: "100%",
        maxHeight: isMobile ? "80vh" : "380px",
        minHeight: isMobile ? "60vh" : "380px",
      }}
    >
      {messages.map((msg: Message, index: number) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
            mb: 0.5,
            width: "100%",
          }}
        >
          <Box
            sx={{
              maxWidth: isMobile ? "90%" : { sm: "75%", md: "70%" },
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              bgcolor: msg.sender === "user" ? "primary.main" : "grey.300",
              color:
                msg.sender === "user" ? "primary.contrastText" : "text.primary",
            }}
            ref={index === messages.length - 1 ? messagesEndRef : null}
          >
            <Typography
              variant="body2"
              sx={{
                textAlign: msg.sender === "user" ? "right" : "left",
                overflowWrap: "break-word",
                fontSize: isMobile ? "0.875rem" : "1rem",
              }}
            >
              <Markdown>{msg.message}</Markdown>
            </Typography>
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              mt: 0.25,
              fontSize: isMobile ? "0.7rem" : "0.75rem",
            }}
          >
            {msg.sender === "user" ? "You" : "Bot"}
          </Typography>
          {msg.sender === "bot" &&
            index === lastBotMessageIndex &&
            prompts?.length > 0 && <SuggestivePrompts prompts={prompts} />}
        </Box>
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatMessages;

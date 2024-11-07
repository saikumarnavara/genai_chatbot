import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { ChatService } from "../../services/chat-service";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentMessage,
  setLoading,
  setError,
  addMessage,
  setPrompts,
} from "../../redux/slices/chat-slice";
import { ReturnPayload } from "../search/Payload";

interface SuggestivePromptsProps {
  prompts: string[];
}

const SuggestivePrompts: React.FC<SuggestivePromptsProps> = ({ prompts }) => {
  const dispatch = useDispatch();
  const { selectedDoc } = useSelector((state: any) => state.doc_list);
  const { searchType } = useSelector((state: any) => state.search_type);

  const removeFirstElement = (str: string) => {
    const words = str.split(" ");
    words.shift();
    return words.join(" ");
  };

  const DispatchPrompt = async (prompt: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(
        addMessage({
          message: removeFirstElement(prompt),
          sender: "user",
        })
      );
      let image = "";
      let customizedPayload = ReturnPayload(
        searchType,
        prompt,
        image,
        selectedDoc
      );

      const response = await ChatService.geminiSearch(customizedPayload);

      if (response.status === 200 && response.data?.response) {
        dispatch(
          addMessage({
            message: response.data.response,
            sender: "bot",
          })
        );
        dispatch(setCurrentMessage(response.data.response));
        dispatch(setPrompts(response.data.suggested_questions || []));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.error("Error in DispatchPrompt:", error);
      dispatch(setError("Failed to fetch response. Please try again."));
      dispatch(
        addMessage({ message: "Failed to fetch response", sender: "bot" })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center", sm: "flex-start" },
        gap: 0.5,
        width: "100%",
        mt: 1,
      }}
    >
      <Typography>
        <b>Chat Suggestions</b>
      </Typography>
      {prompts
        .filter((prompt) => prompt.trim() !== "")
        .map((prompt, index) => (
          <Button
            key={index}
            variant="text"
            size="small"
            onClick={() => DispatchPrompt(prompt)}
            sx={{
              color: "text.secondary",
              textTransform: "none",
            }}
          >
            {prompt}
          </Button>
        ))}
    </Box>
  );
};

export default SuggestivePrompts;

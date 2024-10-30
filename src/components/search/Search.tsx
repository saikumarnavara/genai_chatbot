import React, { useState } from "react";
import { ChatService } from "../../services/chat-service";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentMessage,
  setLoading,
  setError,
  addMessage,
} from "../../redux/slices/chat-slice";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import DocumentUpload from "../document-upload-modal/DocumentUpload";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>("");
  const { isLoading } = useSelector((state: any) => state.chat);
  const { selectedDoc } = useSelector((state: any) => state.doc_list);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = async () => {
    if (!searchText || searchText.trim() === "") {
      console.log("Search text cannot be empty.");
      return;
    }

    try {
      dispatch(setLoading(true));
      // const response = await ChatService.sendMessage({
      //   prompt: searchText,
      // });

      const response = await ChatService.documentChat({
        file_id: selectedDoc,
        question: searchText,
      });
      dispatch(setCurrentMessage(searchText));
      dispatch(
        addMessage({
          message: searchText,
          sender: "user",
        })
      );

      if (response.status === 200 && response.data?.response) {
        dispatch(
          addMessage({
            message: response.data.response,
            sender: "bot",
          })
        );
        setSearchText("");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error: any) {
      console.error("Error occurred:", error.message || error);
      if (error.response) {
        console.error("Server response:", error.response.data);
        dispatch(setError(error.response.data.error || "An error occurred"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          my: 2,
          width: "100%",
          marginBottom: 0,
        }}
      >
        <TextField
          label="Enter search text"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <DocumentUpload />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchClick}
          disabled={isLoading}
          sx={{
            height: "56px",
            minWidth: "100px",
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Search"}
        </Button>
      </Box>
    </>
  );
};

export default Search;

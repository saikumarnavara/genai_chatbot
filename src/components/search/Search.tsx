import React, { useState } from "react";
import { ChatService } from "../../services/chat-service";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentMessage,
  setLoading,
  addMessage,
  setPrompts,
} from "../../redux/slices/chat-slice";
import { TextField, Button, Box, InputAdornment } from "@mui/material";
import DocumentUpload from "../document-upload-modal/DocumentUpload";
import ImageUpload from "../document-upload-modal/ImageUpload";
import LoadingDots from "../loading-dots/LoadingDots";
import SearchIcon from "@mui/icons-material/Search";
import { ReturnPayload } from "./Payload";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>("");
  const [multiModalImg, setMultiModalImg] = useState(null);
  const { isLoading } = useSelector((state: any) => state.chat);
  const { selectedDoc } = useSelector((state: any) => state.doc_list);
  const { searchType } = useSelector((state: any) => state.search_type);
  let customizedPayload = ReturnPayload(
    searchType,
    searchText,
    multiModalImg,
    selectedDoc
  );

  const handleMultiModalImg = (img: any) => {
    if (img) {
      setMultiModalImg(img);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = async () => {
    if (searchType === "textsearch" && searchText.length === 0) {
      alert("Please enter a text.");
      return;
    }
    if (
      (searchType === "multimodal" && !multiModalImg) ||
      searchText.length === 0
    ) {
      alert("Please upload an image and write prompt ");
      return;
    }
    if (searchType === "documentsearch" && !selectedDoc) {
      alert("Please select a document.");
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(
        addMessage({
          message: searchText,
          sender: "user",
        })
      );

      let response = await ChatService.geminiSearch(customizedPayload);

      dispatch(setCurrentMessage(searchText));
      if (response.status === 200 && response.data?.response) {
        dispatch(
          addMessage({
            message: response.data.response,
            sender: "bot",
          })
        );
        dispatch(setLoading(false));
        dispatch(setPrompts(response.data?.suggested_questions));
        setSearchText("");
      }
    } catch (error: any) {
      console.error("Error occurred:", error.message || error);
      dispatch(
        addMessage({
          message: error.message,
          sender: "bot",
        })
      );
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
          label="Enter prompt..."
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {searchType === "multimodal" ? (
                  <ImageUpload handleImg={handleMultiModalImg} />
                ) : searchType === "documentsearch" ? (
                  <DocumentUpload />
                ) : null}
              </InputAdornment>
            ),
            sx: {
              "& .MuiOutlinedInput-root": {
                color: "#000",
                "& fieldset": {
                  borderColor: "#000",
                },
                "&:hover fieldset": {
                  borderColor: "grey",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#000 !important",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#000",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#000 !important",
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearchClick}
          disabled={isLoading}
          sx={{
            height: "56px",
            minWidth: "56px",
            backgroundColor: "#1A1A1A",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#A1A1A1",
            },
            "&:disabled": {
              backgroundColor: "#333",
            },
          }}
        >
          {isLoading ? <LoadingDots /> : <SearchIcon />}
        </Button>
      </Box>
    </>
  );
};

export default Search;

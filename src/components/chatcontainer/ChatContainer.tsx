import Search from "../search/Search";
import ChatMessages from "./Messages";
import { Box } from "@mui/material";
import ListingOfDoc from "../Documents/ListingOfDoc";

const ChatContainer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "800px",
        width: "100%",
        margin: "0 auto",
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
        marginTop: "40px",
      }}
    >
      <ChatMessages />
      <Search />
      <ListingOfDoc />
    </Box>
  );
};

export default ChatContainer;

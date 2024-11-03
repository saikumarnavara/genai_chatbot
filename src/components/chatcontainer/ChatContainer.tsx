import Search from "../search/Search";
import ChatMessages from "./Messages";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const ChatContainer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: isMobile ? "100%" : "800px",
        width: "100%",
        margin: "0 auto",
        p: isMobile ? 3 : 3,
        boxShadow: isMobile ? 1 : 3,
        borderRadius: isMobile ? 0 : 2,
        bgcolor: "background.paper",
        marginTop: isMobile ? "70px" : "70px",
        paddingTop: isMobile ? "0px" : "0px",
      }}
    >
      <ChatMessages />
      <Search />
    </Box>
  );
};

export default ChatContainer;

import Search from "../search/Search";
import ChatMessages from "./Messages";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import SelectModel from "../model-select/SelectModel";

const ChatContainer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "flex-start",
        justifyContent: "center",
        maxWidth: "100%",
        margin: "0 auto",
        p: 3,
        flexGrow: 1,
        bgcolor: "grey.100",
      }}
    >
      <Box
        sx={{
          width: isMobile ? "100%" : "250px",
          mb: isMobile ? 3 : 0,
          boxShadow: isMobile ? 1 : 3,
          borderRadius: isMobile ? 0 : 2,
          bgcolor: "background.paper",
          marginTop: isMobile ? "50px" : "50px",
          paddingTop: isMobile ? "0px" : "0px",
        }}
      >
        <SelectModel />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: isMobile ? "100%" : "800px",
          width: "100%",
          margin: isMobile ? "0 auto" : "0 0 0 16px", // Margin for spacing on desktop
          p: isMobile ? 3 : 3,
          boxShadow: isMobile ? 1 : 3,
          borderRadius: isMobile ? 0 : 2,
          bgcolor: "background.paper",
          marginTop: isMobile ? "0px" : "50px",
          paddingTop: isMobile ? "5px" : "5px",
        }}
      >
        <ChatMessages />
        <Search />
      </Box>
    </Box>
  );
};

export default ChatContainer;

import { Box } from "@mui/material";

const LoadingDots = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& div": {
          width: "8px",
          height: "8px",
          margin: "0 4px",
          borderRadius: "50%",
          backgroundColor: "#000",
          animation: "loadingDots 0.6s infinite alternate",
        },
        "& div:nth-of-type(1)": { animationDelay: "0s" },
        "& div:nth-of-type(2)": { animationDelay: "0.2s" },
        "& div:nth-of-type(3)": { animationDelay: "0.4s" },
        "@keyframes loadingDots": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.5)", opacity: 0.5 },
        },
      }}
    >
      <div></div>
      <div></div>
      <div></div>
    </Box>
  );
};

export default LoadingDots;

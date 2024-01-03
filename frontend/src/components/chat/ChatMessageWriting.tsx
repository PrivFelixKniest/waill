import { Box } from "@mui/material";
import { CHATBUBBLE2 } from "../../colors";
import { useEffect, useState } from "react";

export const ChatMessageWriting = () => {
  const [loadingText, setLoadingText] = useState("Lowering Bucket ...");

  useEffect(() => {
    setTimeout(() => {
      setLoadingText("Fishing for Answers ...");
    }, 2500);
  }, []);

  return (
    <Box
      className="message-animation"
      sx={{
        marginRight: "auto",
      }}
    >
      <Box
        sx={{
          marginRight: "100px",
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "11px",
          }}
        >
          <Box sx={{ fontWeight: "bold" }}>Bucket</Box>
          <Box
            sx={{
              fontSize: "14px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {loadingText}
          </Box>
        </Box>

        <Box
          sx={{
            padding: "10px 14px",
            backgroundColor: CHATBUBBLE2,
            borderRadius: "10px 10px 10px 0",
            maxWidth: "800px",
            marginRight: "auto",
            width: "fit-content",
            display: "flex",
            gap: "3px",
          }}
        >
          <Box className="bouncing-dot dot-1" />
          <Box className="bouncing-dot dot-2" />
          <Box className="bouncing-dot dot-3" />
        </Box>
      </Box>
    </Box>
  );
};

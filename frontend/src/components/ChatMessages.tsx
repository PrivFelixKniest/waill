import { Box, IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import { DARKTEAL } from "../colors";

export const ChatMessages = () => {
  const selectedWellId = useSelector(
    (state: RootState) => state.chat.selectedWellId
  );

  if (selectedWellId === null) {
    return (
      <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          Please create a Well on the right side in order to start asking
          questions!
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
      {selectedWellId}
    </Box>
  );
};

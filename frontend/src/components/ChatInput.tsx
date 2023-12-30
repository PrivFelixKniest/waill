import { Box, IconButton, Tooltip } from "@mui/material";
import {
  DARKHIGHLIGHTTEAL,
  DARKTEAL,
  GRAYTEAL,
  HIGHLIGHTTEAL,
  LIGHTHIGHLIGHTTEAL,
  LIGHTTEAL,
} from "../colors";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { OverlayModal } from "./OverlayModal";
import { UploadFilePage } from "./UploadFilePage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const ChatInput = () => {
  const [openUploadFiles, setOpenUploadFiles] = useState(false);
  const selectedWellId = useSelector(
    (state: RootState) => state.chat.selectedWellId
  );

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px 17px;
    border-radius: 8px;
    color: ${DARKTEAL};
    background: ${LIGHTTEAL};
    border: 2px solid ${LIGHTHIGHLIGHTTEAL};
    resize: none;
    transition: border .2s ease;

    ::placeholder {
      color: ${GRAYTEAL};
      opacity: 1; /* Firefox */
    }

    &:hover {
      border-color: ${HIGHLIGHTTEAL};
    }

    &:focus {
      border-color: ${DARKHIGHLIGHTTEAL};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  const getPlaceholderText = () => {
    const seed = Math.random();
    if (seed < 0.05) {
      return "Why do we park in a driveway and drive on a parkway?";
    } else if (seed < 0.1) {
      return "If a turtle doesn't have a shell, is it homeless or naked?";
    } else if (seed < 0.15) {
      return "Do penguins have knees?";
    } else if (seed < 0.2) {
      return "Why don't we ever see baby pigeons?";
    } else if (seed < 0.25) {
      return "Can you cry underwater?";
    } else if (seed < 0.3) {
      return "If money doesn't grow on trees, why do banks have branches?";
    } else if (seed < 0.35) {
      return "Why is it called a building if it's already built?";
    } else if (seed < 0.4) {
      return "If ghosts can walk through walls, why don't they fall through the floor?";
    } else if (seed < 0.45) {
      return "If a tomato is a fruit, is ketchup a smoothie?";
    } else if (seed < 0.5) {
      return "Why do we say 'heads up' when we actually mean 'duck'?";
    } else if (seed < 0.55) {
      return "Why did the chicken cross the road?";
    } else if (seed < 0.6) {
      return "What's the best way to make a cup of tea?";
    } else if (seed < 0.65) {
      return "How many programmers does it take to change a light bulb?";
    } else if (seed < 0.7) {
      return "Why don't scientists trust atoms?";
    } else if (seed < 0.75) {
      return "What's the difference between a snowman and a snowwoman?";
    } else if (seed < 0.8) {
      return "Why don't skeletons fight each other?";
    } else if (seed < 0.85) {
      return "How do you organize a space party?";
    } else if (seed < 0.9) {
      return "Why did the scarecrow win an award?";
    } else if (seed < 0.95) {
      return "What do you call a bear with no teeth?";
    } else {
      return "Why did the tomato turn red?";
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "10px 50px",
        position: "relative",
      }}
    >
      <Textarea
        maxRows={4}
        aria-label="maximum height"
        placeholder={getPlaceholderText()}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          minWidth: "60%",
        }}
      />

      <Tooltip arrow title="Upload new File to Well">
        <Box
          sx={{
            position: "absolute",
            bottom: "17px",
            left: "0",
          }}
        >
          <IconButton
            onClick={() => setOpenUploadFiles(true)}
            disabled={!selectedWellId}
          >
            <FileUploadRoundedIcon color="inherit" sx={{ color: DARKTEAL }} />
          </IconButton>
        </Box>
      </Tooltip>
      <OverlayModal open={openUploadFiles} setOpen={setOpenUploadFiles}>
        <UploadFilePage setOpen={setOpenUploadFiles} />
      </OverlayModal>
    </Box>
  );
};

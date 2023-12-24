import { Box, IconButton, Tooltip } from "@mui/material";
import {
  DARKHIGHLIGHTTEAL,
  DARKTEAL,
  HIGHLIGHTTEAL,
  LIGHTHIGHLIGHTTEAL,
  LIGHTTEAL,
} from "../colors";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
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
      color: ${DARKTEAL};
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
    if (seed < 0.2) {
      return "What does ...";
    } else if (seed < 0.4) {
      return "Who is ...";
    } else if (seed < 0.6) {
      return "Why are ...";
    } else if (seed < 0.8) {
      return "Who has ...";
    } else {
      return "What are ...";
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
        <IconButton
          sx={{
            position: "absolute",
            bottom: "17px",
            left: "0",
          }}
          onClick={() => setOpenUploadFiles(true)}
          disabled={!selectedWellId}
        >
          <AttachFileRoundedIcon color="inherit" sx={{ color: DARKTEAL }} />
        </IconButton>
      </Tooltip>
      <OverlayModal open={openUploadFiles} setOpen={setOpenUploadFiles}>
        <UploadFilePage setOpen={setOpenUploadFiles} />
      </OverlayModal>
    </Box>
  );
};

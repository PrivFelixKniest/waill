import { Box } from "@mui/material";
import {
  DARKHIGHLIGHTTEAL,
  DARKTEAL,
  HIGHLIGHTTEAL,
  LIGHTHIGHLIGHTTEAL,
  LIGHTSAND,
  LIGHTTEAL,
  SAND,
} from "../colors";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

export const ChatInput = () => {
  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 100%;
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
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "10px 50px",
      }}
    >
      <Textarea
        maxRows={4}
        aria-label="maximum height"
        placeholder={getPlaceholderText()}
      />
    </Box>
  );
};

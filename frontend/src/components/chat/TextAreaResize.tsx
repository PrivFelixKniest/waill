import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import {
  DARKHIGHLIGHTTEAL,
  DARKTEAL,
  GRAYTEAL,
  HIGHLIGHTTEAL,
  LIGHTHIGHLIGHTTEAL,
  LIGHTTEAL,
} from "../../colors";

export const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  line-height: 1.5;
  border-radius: 10px 5px 5px 10px;
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

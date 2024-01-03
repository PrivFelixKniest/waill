import { Box, IconButton, Tooltip } from "@mui/material";
import {
  DARKHIGHLIGHTTEAL,
  DARKTEAL,
  GRAYTEAL,
  HIGHLIGHTTEAL,
  LIGHTHIGHLIGHTTEAL,
  LIGHTTEAL,
} from "../../colors";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { OverlayModal } from "../OverlayModal";
import { UploadFilePage } from "../UploadFilePage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getRun, postQuery } from "../../api/messages";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Creator, runType, wellType } from "../../types/chat";
import { addMessageToWell, setWells } from "../../redux/slices/chatSlice";
import { time } from "console";

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px 17px;
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

export const ChatInput = () => {
  const dispatch = useDispatch();
  const [openUploadFiles, setOpenUploadFiles] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [promptLoading, setPromptLoading] = useState(false);
  const { selectedWellId, wells } = useSelector(
    (state: RootState) => state.chat
  );

  const { getAccessTokenSilently } = useAuth0();

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

  const startFetchingForAnswer = async (
    runId: string,
    wellId: number,
    authToken: string
  ) => {
    try {
      let run: runType = await getRun(runId, wellId, authToken);
      while (
        ![
          "failed",
          "requires_action",
          "cancelled",
          "completed",
          "expired",
        ].includes(run.run_status)
      ) {
        await new Promise((r) => setTimeout(r, 1000));
        run = await getRun(runId, wellId, authToken);
      }

      if (run.run_status === "completed" && run.response !== null) {
        const displayDate = new Date();
        const timezoneOffset = new Date().getTimezoneOffset();
        const cleanedDate = new Date(
          displayDate.getTime() + timezoneOffset * 60000
        );
        dispatch(
          addMessageToWell({
            wellId: wellId,
            message: {
              id: new Date().getTime(),
              content: run.response?.content || "",
              message_index:
                wells.find((well) => well.id === wellId)?.messages.length ||
                new Date().getTime(),
              created_at: cleanedDate.toUTCString(),
              creator: Creator.assistant,
            },
          })
        );
        setPromptLoading(false);
      } else {
        toast.warning(
          `Something went wrong trying to generate your response: ${
            run?.last_error || ""
          }, please try again later.`
        );
        setPromptLoading(false);
      }
    } catch (err) {
      toast.error(
        `Something went wrong trying fetch your response, please try again later.`
      );
    }
  };

  const handleSubmitPrompt = () => {
    if (selectedWellId) {
      const displayDate = new Date();
      const timezoneOffset = new Date().getTimezoneOffset();
      const cleanedDate = new Date(
        displayDate.getTime() + timezoneOffset * 60000
      );
      dispatch(
        addMessageToWell({
          wellId: selectedWellId,
          message: {
            id: new Date().getTime(),
            content: prompt,
            message_index:
              wells.find((well) => well.id === selectedWellId)?.messages
                .length || new Date().getTime(),
            created_at: cleanedDate.toUTCString(),
            creator: Creator.user,
          },
        })
      );
      setPrompt("");
      getAccessTokenSilently()
        .then((authToken: string) => {
          setPromptLoading(true);
          postQuery(prompt, selectedWellId, authToken)
            .then((resp: runType) => {
              startFetchingForAnswer(resp.run_id, selectedWellId, authToken);
            })
            .catch((err: AxiosError) => {
              setPromptLoading(false);
              toast.error(
                "Something went wrong trying to submit your prompt, please try again later."
              );
            });
        })
        .catch((err: any) => {
          toast.error(
            "There was an error getting your authorization token, please try again later."
          );
        });
    } else {
      toast.warning("No well was selected while trying to send your prompt.");
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
      <Box
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          minWidth: "60%",
          display: "flex",
          gap: "4px",
        }}
      >
        <Textarea
          key={"ThisistheTextArea!"}
          maxRows={4}
          aria-label="maximum height"
          placeholder={getPlaceholderText()}
          value={prompt}
          name="Prompt"
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            width: "calc(100% - 44px)",
          }}
        />
        <button
          className="submit-button"
          style={{
            width: "40px",
            height: "100%",
            position: "relative",
            borderRadius: "5px 10px 10px 5px",
          }}
          type="button"
          onClick={handleSubmitPrompt}
          disabled={promptLoading || selectedWellId === null}
        >
          <SendRoundedIcon
            color="inherit"
            sx={{
              color: DARKTEAL,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        </button>
      </Box>

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

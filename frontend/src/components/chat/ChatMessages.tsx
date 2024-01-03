import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ChatMessage } from "./ChatMessage";
import { Creator, messageType } from "../../types/chat";
import { ChatMessageWriting } from "./ChatMessageWriting";

export const ChatMessages = () => {
  const { wells, selectedWellId, promptLoadingWellId } = useSelector(
    (state: RootState) => state.chat
  );

  if (selectedWellId === null || wells.length === 0) {
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
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column-reverse",
        overflowY: "scroll",
        padding: "10px",
        paddingTop: "0px",
      }}
    >
      {promptLoadingWellId === selectedWellId && <ChatMessageWriting />}
      {wells
        .filter((well) => well.id === selectedWellId)[0]
        .messages.map((message: messageType) => {
          return <ChatMessage key={message.id} message={message} />;
        })}
      {wells.filter((well) => well.id === selectedWellId)[0].messages.length ===
        0 && (
        <ChatMessage
          key={"Initial message on the page"}
          message={{
            content:
              "Hey! \n Type something below and submit the message in order to get an answer!",
            creator: Creator.assistant,
            created_at: "",
            message_index: 0,
            id: new Date().getTime(),
          }}
        />
      )}
    </Box>
  );
};

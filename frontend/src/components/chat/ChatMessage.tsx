import { Box } from "@mui/material";
import { messageType } from "../../types/chat";
import { CHATBUBBLE1, CHATBUBBLE2 } from "../../colors";

interface ChatMessageProps {
  message: messageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const displayDate = new Date(message.created_at || "");
  const timezoneOffset = new Date().getTimezoneOffset();
  const timezoneDate = new Date(displayDate.getTime() - timezoneOffset * 60000);

  return (
    <Box
      className="message-animation"
      sx={{
        marginLeft: message.creator === "assistant" ? "0px" : "auto",
        marginRight: message.creator === "user" ? "0px" : "auto",
      }}
    >
      <Box
        sx={{
          marginLeft:
            message.creator === "assistant"
              ? "0px"
              : { xs: "40px", md: "70px" },
          marginRight:
            message.creator === "user" ? "0px" : { xs: "40px", md: "70px" },
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: message.creator === "user" ? "row-reverse" : "row",
            gap: "11px",
          }}
        >
          <Box
            sx={{ fontWeight: "bold", fontSize: { xs: "14px", sm: "16px" } }}
          >
            {message.creator === "user" ? "You" : "Bucket"}
          </Box>
          <Box
            sx={{
              fontSize: { xs: "13px", sm: "14px" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {message.created_at &&
              message.created_at !== "" &&
              timezoneDate.toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
          </Box>
        </Box>

        <Box
          sx={{
            padding: "10px 14px",
            backgroundColor:
              message.creator === "user" ? CHATBUBBLE1 : CHATBUBBLE2,
            borderRadius:
              message.creator === "user"
                ? "10px 10px 0 10px "
                : "10px 10px 10px 0",
            maxWidth: "800px",
            marginLeft: message.creator === "user" ? "auto" : "",
            marginRight: message.creator === "assistant" ? "auto" : "",
            width: "fit-content",
            fontSize: { xs: "13px", sm: "14px" },
          }}
        >
          {message.content.split("\n").map((paragraph: string, idx) => {
            return (
              <Box
                key={idx}
                sx={{
                  marginBottom:
                    message.content.split("\n").length - 1 !== idx
                      ? "10px"
                      : "0px",
                }}
              >
                {paragraph.replaceAll(String.fromCharCode(92), "")}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

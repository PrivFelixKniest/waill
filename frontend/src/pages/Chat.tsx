import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { ChatMessages } from "../components/ChatMessages";
import { ChatInput } from "../components/ChatInput";
import { DARKTEAL, LIGHTSAND, LIGHTTEAL, SAND } from "../colors";
import { Sidebar } from "../components/Sidebar";

function Chat() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated, isLoading]);

  if (!isLoading && isAuthenticated) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          color: DARKTEAL,
        }}
      >
        <Box
          sx={{
            height: "50px",
            backgroundColor: LIGHTTEAL,
            padding: "5px 15px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              fontWeight: "bold",
              fontSize: "23px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            Waill.
          </Box>
          <Box
            sx={{
              fontSize: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            Support Waill today by ...
          </Box>
        </Box>
        <Box sx={{ flexGrow: "1", backgroundColor: SAND, display: "flex" }}>
          <Sidebar />
          <Box
            sx={{
              flexGrow: "1",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ flexGrow: "1" }}>
              <ChatMessages />
            </Box>
            <Box sx={{ height: "200px" }}>
              <ChatInput />
            </Box>
          </Box>
          <Box
            sx={{ width: "250px", backgroundColor: LIGHTSAND, padding: "20px" }}
          >
            <Box sx={{ fontSize: "20px" }}>Wells</Box>
          </Box>
        </Box>
      </Box>
    );
  }
  return (
    <Box
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        backgroundColor: "#fef6ea",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Loading ...
      </div>
    </Box>
  );
}

export default Chat;

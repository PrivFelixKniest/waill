import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { ChatMessages } from "../components/ChatMessages";
import { ChatInput } from "../components/ChatInput";
import { DARKTEAL, LIGHTSAND, LIGHTTEAL, SAND } from "../colors";
import { Sidebar } from "../components/Sidebar";
import { getUser } from "../api/userInformation";
import { setOpenaiKey, setWells } from "../redux/slices/chatSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { WellsBar } from "../components/WellsBar";
import { getWells } from "../api/wells";

function Chat() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userLoading, setUserLoading] = useState(true);
  const [wellsLoading, setWellsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        window.location.href = "/";
      } else if (isAuthenticated) {
        setUserLoading(true);
        // token is not yet valid error (iat)
        setTimeout(() => {
          getAccessTokenSilently()
            .then((authToken: string) => {
              getUser(authToken)
                .then((resp: any) => {
                  dispatch(setOpenaiKey(resp.openai_api_key));
                  setUserLoading(false);
                  setWellsLoading(true);
                  getWells(authToken)
                    .then((resp) => {
                      setWellsLoading(false);
                      dispatch(setWells(resp));
                    })
                    .catch((err: any) => {
                      setWellsLoading(false);
                      toast.error(
                        "There was an error fetching your wells, please try again later."
                      );
                    });
                })
                .catch((err: any) => {
                  toast.error(
                    "There was an error fetching your user data, please try again."
                  );
                });
            })
            .catch((err: any) => {
              toast.error(
                "There was an error getting your authorization token, please try again later."
              );
            });
        }, 750);
      }
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
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
          Authenticating ...
        </div>
      </Box>
    );
  }

  if (userLoading) {
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
          Loading User Data...
        </div>
      </Box>
    );
  }

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
      {!isLoading && isAuthenticated && (
        <>
          <Box
            sx={{
              height: "50px",
              backgroundColor: LIGHTTEAL,
              padding: "5px 15px",
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              borderBottom: `2px solid ${DARKTEAL}`,
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
              Gain Insights Fast, powered by AI
            </Box>
          </Box>
          <Box
            sx={{ flexGrow: "1", backgroundColor: LIGHTSAND, display: "flex" }}
          >
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
            <WellsBar wellsLoading={wellsLoading} />
          </Box>
        </>
      )}
    </Box>
  );
}

export default Chat;

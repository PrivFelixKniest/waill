import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { ChatMessages } from "../components/chat/ChatMessages";
import { ChatInput } from "../components/chat/ChatInput";
import { DARKTEAL, LIGHTSAND, LIGHTTEAL, SAND } from "../colors";
import { Sidebar } from "../components/Sidebar";
import { getUser } from "../api/userInformation";
import {
  setOpenaiKey,
  setSelectedWellId,
  setWells,
} from "../redux/slices/chatSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { WellsBar } from "../components/WellsBar";
import { getWells } from "../api/wells";
import { fileType, wellRepsonseType, wellType } from "../types/chat";
import { getFiles } from "../api/files";
import { setAuthToken } from "../api/authToken";
import CircularProgress from "@mui/material/CircularProgress";

export const topbarHeight = "50px";
const chatInputHeight = "80px";

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
        getAccessTokenSilently()
          .then((authToken: string) => {
            setAuthToken(authToken);
            // token is not yet valid error (iat)
            setTimeout(() => {
              getUser(authToken)
                .then((uaserResp: any) => {
                  dispatch(setOpenaiKey(uaserResp.openai_api_key));
                  setUserLoading(false);
                  setWellsLoading(true);
                  getWells(authToken)
                    .then((wellsResp: wellRepsonseType[]) => {
                      if (wellsResp.length !== 0) {
                        dispatch(setSelectedWellId(wellsResp[0].id));
                        Promise.all(
                          wellsResp.map((well) => {
                            return getFiles(well.id, authToken);
                          })
                        )
                          .then(
                            (
                              allFilesResponse: {
                                wellId: number;
                                data: fileType[];
                              }[]
                            ) => {
                              const storeWells: wellType[] = wellsResp.map(
                                (well) => {
                                  return {
                                    ...well,
                                    files: allFilesResponse.filter(
                                      (filesResponse) =>
                                        filesResponse.wellId === well.id
                                    )?.[0].data,
                                  };
                                }
                              );
                              setWellsLoading(false);
                              dispatch(setWells(storeWells));
                            }
                          )
                          .catch((err: any) => {
                            setWellsLoading(false);
                            toast.error(
                              "There was an error fetching your files, please try again later."
                            );
                          });
                      } else {
                        setWellsLoading(false);
                      }
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
            }, 5000);
          })
          .catch((err: any) => {
            toast.error(
              "There was an error getting your authorization token, please try again later."
            );
          });
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
          color: DARKTEAL,
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <CircularProgress
              color="inherit"
              sx={{
                color: DARKTEAL,
              }}
            />
          </Box>
          <Box sx={{ textAlign: "center" }}>Authenticating</Box>
          <Box sx={{ opacity: "0.6", fontSize: "14px", textAlign: "center" }}>
            We are authenticating your login Information!
          </Box>
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
            color: DARKTEAL,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <CircularProgress
              color="inherit"
              sx={{
                color: DARKTEAL,
              }}
            />
          </Box>
          <Box sx={{ textAlign: "center" }}>Loading User Data</Box>
          <Box sx={{ opacity: "0.6", fontSize: "14px", textAlign: "center" }}>
            If we are experiencing more traffic than usual, this initial load
            might take up to a minute.
          </Box>
        </div>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100vw",
        maxWidth: "100vw",
        height: "100vh",
        overflow: "hidden",
        maxHeight: "100vh",
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
              height: topbarHeight,
              backgroundColor: LIGHTTEAL,
              padding: "5px 15px",
              display: "flex",
              gap: { xs: "6px", sm: "10px" },
              justifyContent: "center",
              borderBottom: `2px solid ${DARKTEAL}`,
            }}
          >
            <Box
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "16px", sm: "23px" },
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
                fontSize: { xs: "14px", sm: "20px" },
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
            sx={{
              height: `calc(100% - ${topbarHeight})`,
              backgroundColor: LIGHTSAND,
              display: "flex",
            }}
          >
            <Sidebar />
            <Box
              sx={{
                padding: "20px",
                paddingTop: "0px",
                display: "flex",
                width: { xs: "100vw", md: "calc(100% - 500px)" },
                flexDirection: "column",
                justifyContent: "flex-end",
                maxHeight: "100%",
              }}
            >
              <Box sx={{ height: `calc(100% - ${chatInputHeight})` }}>
                <ChatMessages wellsLoading={wellsLoading} />
              </Box>
              <Box
                sx={{
                  height: chatInputHeight,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
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

import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { ChatMessages } from "../components/ChatMessages";
import { ChatInput } from "../components/ChatInput";
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
            }, 2000);
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
        maxWidth: "100vw",
        height: "100vh",
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
              <Box>
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

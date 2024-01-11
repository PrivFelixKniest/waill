import { useState } from "react";

import { Box, IconButton, Tooltip } from "@mui/material";
import { DARKTEAL, LIGHTTEAL, SAND } from "../colors";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { OverlayModal } from "./OverlayModal";
import { CreateWellPage } from "./CreateWellPage";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteWell } from "../api/wells";
import {
  removeWell,
  setSelectedWellId,
  setWells,
} from "../redux/slices/chatSlice";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { topbarHeight } from "../pages/Chat";

interface WellsBarProps {
  wellsLoading: boolean;
}

export const WellsBar = ({ wellsLoading }: WellsBarProps) => {
  const dispatch = useDispatch();
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [openCreateWell, setOpenCreateWell] = useState(false);
  const [deleteWellLoading, setDeleteWellLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const wells = useSelector((state: RootState) => state.chat.wells);
  const selectedWellId = useSelector(
    (state: RootState) => state.chat.selectedWellId
  );

  const handleDeleteWell = (id: number) => {
    setDeleteWellLoading(true);
    getAccessTokenSilently()
      .then((authToken: string) => {
        deleteWell(id, authToken)
          .then((resp: any) => {
            const wellToRemove = wells.find((well) => well.id === id);
            // type check
            if (wellToRemove) {
              dispatch(removeWell(wellToRemove));
              if (selectedWellId === id) {
                if (
                  wells.filter((well) => well.id !== selectedWellId).length > 0
                ) {
                  dispatch(
                    setSelectedWellId(
                      wells.filter((well) => well.id !== selectedWellId)[0].id
                    )
                  );
                } else {
                  dispatch(setSelectedWellId(null));
                }
              }
              toast.success("Successfully deleted");
            }

            setDeleteWellLoading(false);
          })
          .catch((err: AxiosError) => {
            toast.error(
              "Something went wrong trying to delete your well, please try again later."
            );
            setDeleteWellLoading(false);
          });
      })
      .catch((err: any) => {
        toast.error(
          "There was an error getting your authorization token, please try again later."
        );
        setDeleteWellLoading(false);
      });
  };

  return (
    <Box
      sx={{
        width: { xs: "100vw", md: "250px" },
        height: { xs: `calc(100vh - ${topbarHeight})`, md: "unset" },
        position: { xs: "absolute", md: "unset" },
        transform: {
          xs: mobileExpanded ? "translateX(0px)" : "translateX(100%)",
          md: "unset",
        },
        transition: "transform .2s ease",
        backgroundColor: SAND,
        zIndex: mobileExpanded ? "2" : "1",
      }}
    >
      <Box
        sx={{
          padding: "20px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "3px",
            left: mobileExpanded ? "3px" : "-43px",
          }}
        >
          <IconButton
            sx={{ display: { xs: "static", md: "none" } }}
            onClick={() => {
              setMobileExpanded((prev) => !prev);
            }}
          >
            <KeyboardArrowRightRoundedIcon
              sx={{
                transform: mobileExpanded ? "rotate(0deg)" : "rotate(180deg)",
                transition: "transform .2s ease ",
              }}
            />
          </IconButton>
        </Box>
        <Box
          sx={{
            fontSize: "20px",
            marginBottom: "20px",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Wells
        </Box>
        {wellsLoading ? (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            Loading Wells...
          </Box>
        ) : (
          <Box
            sx={{
              height: "calc(100% - 46px)",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            {wells.map((well) => {
              return (
                <Tooltip
                  key={well.id}
                  arrow
                  placement="left"
                  title={
                    well.instructions === ""
                      ? ""
                      : "Instructions: " + well.instructions
                  }
                  sx={{
                    position: "relative",
                  }}
                >
                  <Box>
                    <button
                      className="secondary-button-small"
                      style={{
                        marginBottom: "10px",
                        width: "100%",
                        whiteSpace: "nowrap",
                        backgroundColor:
                          well.id === selectedWellId ? LIGHTTEAL : "",
                      }}
                      onClick={() => dispatch(setSelectedWellId(well.id))}
                    >
                      <span style={{ fontSize: "17px" }}>{well.name}</span>
                      <br />
                      <span style={{ opacity: ".7" }}>{well.model}</span>
                    </button>

                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                      }}
                      onClick={() => handleDeleteWell(well.id)}
                      disabled={deleteWellLoading}
                    >
                      <CloseRoundedIcon
                        color="inherit"
                        sx={{ color: DARKTEAL }}
                      />
                    </IconButton>
                  </Box>
                </Tooltip>
              );
            })}
            <button
              className="well-button"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              onClick={() => setOpenCreateWell(true)}
              disabled={deleteWellLoading}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <AddRoundedIcon />
              </Box>
            </button>
            <OverlayModal open={openCreateWell} setOpen={setOpenCreateWell}>
              <CreateWellPage setOpen={setOpenCreateWell} />
            </OverlayModal>
          </Box>
        )}
      </Box>
    </Box>
  );
};

import { useState } from "react";

import { Box, IconButton, Tooltip } from "@mui/material";
import { DARKTEAL, LIGHTTEAL, SAND } from "../colors";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { OverlayModal } from "./OverlayModal";
import { CreateWellPage } from "./CreateWellPage";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteWell } from "../api/wells";
import { setSelectedWellId, setWells } from "../redux/slices/chatSlice";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface WellsBarProps {
  wellsLoading: boolean;
}

export const WellsBar = ({ wellsLoading }: WellsBarProps) => {
  const dispatch = useDispatch();
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
            const newWells = wells.filter((well) => well.id !== id);
            dispatch(setWells(newWells));
            if (selectedWellId === id) {
              if (newWells.length > 0) {
                dispatch(setSelectedWellId(newWells[0].id));
              } else {
                dispatch(setSelectedWellId(null));
              }
            }
            toast.success("Successfully deleted");
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
        width: "250px",
        height: "100%",
        backgroundColor: SAND,
      }}
    >
      <Box sx={{ padding: "20px" }}>
        <Box sx={{ fontSize: "20px", marginBottom: "20px" }}>Wells</Box>
        {wellsLoading ? (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            Loading Wells...
          </Box>
        ) : (
          <Box>
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

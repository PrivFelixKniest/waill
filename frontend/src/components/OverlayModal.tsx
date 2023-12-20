import { Dispatch, ReactElement, SetStateAction } from "react";

import { Box, IconButton, Modal } from "@mui/material";
import { DARKTEAL, LIGHTSAND, LIGHTTEAL } from "../colors";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface OverlayModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactElement;
}

export const OverlayModal = ({
  open,
  setOpen,
  children,
}: OverlayModalProps) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: LIGHTSAND,
          padding: "15px",
          borderRadius: "15px",
          maxHeight: "80vh",
          maxWidth: "80vw",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <IconButton
            sx={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
            }}
            onClick={() => setOpen(false)}
          >
            <CloseRoundedIcon color="inherit" sx={{ color: DARKTEAL }} />
          </IconButton>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

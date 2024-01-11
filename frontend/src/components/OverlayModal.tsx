import { Dispatch, ReactElement, SetStateAction } from "react";

import { Box, IconButton, Modal } from "@mui/material";
import { DARKTEAL, LIGHTSAND } from "../colors";
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
          width: { xs: "95vw", sm: "unset", md: "unset" },
          maxHeight: { xs: "95vh", sm: "90vh", md: "80vh" },
          maxWidth: { xs: "95vw", sm: "90vw", md: "80vw" },
          overflowY: "scroll",
        }}
      >
        <Box
          sx={{
            position: "relative",
          }}
        >
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

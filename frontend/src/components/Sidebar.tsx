import { useState } from "react";

import { Box } from "@mui/material";
import { DARKTEAL, LIGHTSAND, LIGHTTEAL } from "../colors";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { OverlayModal } from "./OverlayModal";
import { SettingsPage } from "./SettingsPage";
import { useAuth0 } from "@auth0/auth0-react";

export const Sidebar = () => {
  const { user } = useAuth0();

  const [openSettings, setOpenSettings] = useState(false);

  return (
    <Box
      sx={{
        width: "250px",
        backgroundColor: LIGHTSAND,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ padding: "20px", flexGrow: "1" }}>Sidebar</Box>
      <Box
        sx={{
          borderTop: "2px solid " + DARKTEAL,
        }}
      >
        <button
          className="profile-button"
          type="button"
          onClick={() => setOpenSettings(true)}
        >
          <img
            src={user?.picture}
            style={{
              minHeight: "40px",
              minWidth: "40px",
              maxHeight: "40px",
              maxWidth: "40px",
              borderRadius: "50%",
            }}
            alt="profile"
          />
          <Box
            sx={{
              whitespace: "nowrap",
              overflow: "hidden",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontSize: "15px",
            }}
          >
            {user?.name}
          </Box>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            className="settings-wheel"
          >
            <SettingsRoundedIcon
              sx={{
                height: "30px",
                width: "30px",
              }}
            />
          </Box>
        </button>
        <OverlayModal open={openSettings} setOpen={setOpenSettings}>
          <SettingsPage />
        </OverlayModal>
      </Box>
    </Box>
  );
};

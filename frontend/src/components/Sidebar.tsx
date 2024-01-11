import { useState } from "react";

import { Box, IconButton } from "@mui/material";
import { DARKTEAL, SAND } from "../colors";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { OverlayModal } from "./OverlayModal";
import { SettingsPage } from "./SettingsPage";
import { useAuth0 } from "@auth0/auth0-react";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { topbarHeight } from "../pages/Chat";

export const Sidebar = () => {
  const { user } = useAuth0();
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const [openSettings, setOpenSettings] = useState(false);

  return (
    <Box
      sx={{
        width: { xs: "100vw", md: "250px" },
        height: { xs: `calc(100vh - ${topbarHeight})`, md: "unset" },
        transform: {
          xs: mobileExpanded ? "translateX(0px)" : "translateX(-100%)",
          md: "unset",
        },
        position: { xs: "absolute", md: "unset" },
        transition: "transform .2s ease",
        backgroundColor: SAND,
        zIndex: mobileExpanded ? "2" : "1",
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "3px",
            right: mobileExpanded ? "3px" : "-43px",
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
                transform: mobileExpanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform .2s ease ",
              }}
            />
          </IconButton>
        </Box>
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
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontSize: "16px",
                lineHeight: "16px",
              }}
            >
              {user?.nickname}
              <br />
              <span style={{ opacity: ".8" }}>{user?.name}</span>
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
    </Box>
  );
};

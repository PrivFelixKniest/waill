import { useState } from "react";

import { Box, IconButton } from "@mui/material";
import { DARKTEAL, SAND } from "../colors";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { OverlayModal } from "./OverlayModal";
import { SettingsPage } from "./SettingsPage";
import { useAuth0 } from "@auth0/auth0-react";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { topbarHeight } from "../pages/Chat";

export const Sidebar = () => {
  const { user } = useAuth0();
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const [openSettings, setOpenSettings] = useState(false);

  const { logout } = useAuth0();

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
        <Box
          sx={{
            padding: "20px",
            flexGrow: "1",
          }}
        >
          <Box
            sx={{
              fontSize: "20px",
              marginBottom: "20px",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Navigation
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <a className="navigation-button" href="/">
              <HomeRoundedIcon />
              Home
            </a>
            <a className="navigation-button" href="/chat">
              <ChatRoundedIcon />
              Chat
            </a>
            <button
              className="navigation-button"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              <LogoutRoundedIcon />
              Sign Out
            </button>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              width: "100%",
              opacity: ".7",
              fontSize: "13px",
              padding: "5px",
            }}
          >
            By using Waill you accept our{" "}
            <a
              href="/privacy"
              style={{
                color: DARKTEAL,
              }}
            >
              privacy policy
            </a>{" "}
            and our{" "}
            <a
              href="/terms"
              style={{
                color: DARKTEAL,
              }}
            >
              terms of service
            </a>
            .
          </Box>
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
    </Box>
  );
};

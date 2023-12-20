import { Box } from "@mui/material";
import { DARKTEAL, LIGHTTEAL, SAND } from "../colors";
import { useAuth0 } from "@auth0/auth0-react";

export const SettingsPage = () => {
  const { logout, user } = useAuth0();
  return (
    <Box sx={{ color: DARKTEAL }}>
      <Box sx={{ fontSize: "20px", marginBottom: "20px" }}>
        Account Settings
      </Box>
      <Box sx={{ marginBottom: "20px", display: "flex", gap: "15px" }}>
        <img
          src={user?.picture}
          style={{
            minHeight: "85px",
            minWidth: "85px",
            maxHeight: "85px",
            maxWidth: "85px",
            borderRadius: "50%",
          }}
          alt="profile"
        />
        <Box>
          <Box>Username: {user?.name}</Box>
          <Box>Nickname: {user?.nickname}</Box>
          <Box>Email: {user?.email}</Box>
          <Box sx={{ opacity: ".7" }}>
            {user?.email_verified ? "Email Verified" : "Email not Verified"}
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        <Box sx={{ marginBottom: "5px" }}>
          <Box>Openai API Key</Box>
          <Box sx={{ opacity: ".7", fontSize: "15px" }}>
            This key is necessary so that this application is able to connect to
            your Openai account and use your GPT Access.
            <br />
            For the same reason you will be able to see your billing information
            inside the Openai dashboard.
            <br />
            Learn how to generate an Openai API Key{" "}
            <a
              href="https://gptforwork.com/help/gpt-for-docs/setup/create-openai-api-key"
              target="_blank"
              rel="noreferrer"
              className="App-link"
            >
              here
            </a>
            .
          </Box>
        </Box>

        <input type="text" placeholder="sk-..." className="input-light" />
      </Box>

      <button
        className="secondary-button-small"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Sign Out
      </button>
    </Box>
  );
};

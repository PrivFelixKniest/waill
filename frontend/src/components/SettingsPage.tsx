import { Box, IconButton, Tooltip } from "@mui/material";
import { DARKTEAL } from "../colors";
import { useAuth0 } from "@auth0/auth0-react";
import { postOpenaiKey } from "../api/userInformation";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setOpenaiKey } from "../redux/slices/chatSlice";
import { toast } from "sonner";

export const SettingsPage = () => {
  const dispatch = useDispatch();
  const { logout, user, getAccessTokenSilently } = useAuth0();
  const openaiKey = useSelector((state: RootState) => state.chat.openaiKey);

  const handleKeySave = () => {
    getAccessTokenSilently()
      .then((authToken: string) => {
        postOpenaiKey(openaiKey, authToken)
          .then((resp: any) => {
            toast.success("Saved");
          })
          .catch((err: any) => {
            toast.error(
              "There was an error saving your key, please try again later."
            );
          });
      })
      .catch((err: any) => {
        toast.error(
          "There was an error getting your authorization token, please try again later."
        );
      });
  };

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
        <Box sx={{ fontSize: { xs: "13px", md: "14px" } }}>
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
          <Box>Default OpenAI API Key</Box>
          <Box sx={{ opacity: ".7", fontSize: { xs: "13px", md: "14px" } }}>
            This key is necessary so that this application is able to connect to
            your OpenAI account and use your GPT Access. For the same reason you
            will be able to see your billing information inside the OpenAI
            dashboard.
            <br />
            Learn how to generate an OpenAI API Key{" "}
            <a
              href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwj4kJX1q5-DAxUmnf0HHWeNBXYQFnoECA4QAw&url=https%3A%2F%2Fplatform.openai.com%2Fdocs%2Fquickstart%23%3A~%3Atext%3DFirst%252C%2520create%2520an%2520OpenAI%2520account%2Cnot%2520share%2520it%2520with%2520anyone.&usg=AOvVaw3lfqD91hEjFi8wl23Wjphg&opi=89978449"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
            .
            <br />
            Please note that Waill will only store your key in order to allow
            you to use the application. We still highly advise periodically
            checking your billing information for suspicious activity, even when
            not using Waill.
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "5px" }}>
          <input
            type="password"
            placeholder="sk-..."
            className="input-light"
            style={{ flexGrow: "1" }}
            value={openaiKey}
            onChange={(e: any) => dispatch(setOpenaiKey(e.target.value))}
          />
          <Tooltip arrow title="Save">
            <span>
              <IconButton onClick={handleKeySave}>
                <CheckRoundedIcon color="inherit" sx={{ color: DARKTEAL }} />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>

      <button
        className="secondary-button-small"
        style={{ display: "flex", gap: "5px", alignItems: "center" }}
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        <LogoutRoundedIcon />
        <Box>Sign Out</Box>
      </button>
    </Box>
  );
};

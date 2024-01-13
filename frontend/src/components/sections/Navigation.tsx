import { Box } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

export const Navigation = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: "5px",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <a
        className="navigation-button"
        href="/"
        style={{
          width: "fit-content",
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <HomeRoundedIcon />
        Home
      </a>
      <a
        className="navigation-button"
        href="/privacy"
        style={{ width: "fit-content" }}
      >
        Privacy
      </a>
      <a
        className="navigation-button"
        href="/terms"
        style={{ width: "fit-content" }}
      >
        Terms
      </a>
    </Box>
  );
};

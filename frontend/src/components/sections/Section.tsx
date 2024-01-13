import { Box } from "@mui/material";
import { ReactElement } from "react";
import { DARKTEAL } from "../../colors";

interface SectionProps {
  children: ReactElement;
}

export const Section = ({ children }: SectionProps) => {
  return (
    <Box sx={{ width: "100%", padding: "30px 0", color: DARKTEAL }}>
      <Box
        sx={{
          width: { xs: "90vw", sm: "85vw", md: "80vw" },
          maxWidth: "1100px",
          margin: "0 auto 0 auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

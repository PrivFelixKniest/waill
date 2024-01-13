import { Box } from "@mui/material";
import { ReactElement } from "react";

interface SplitContainerProps {
  children: ReactElement;
}

export const SplitContainer = ({ children }: SplitContainerProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: "15px",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      {children}
    </Box>
  );
};

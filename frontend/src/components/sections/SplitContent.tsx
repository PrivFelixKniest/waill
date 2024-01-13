import { Box } from "@mui/material";
import { ReactElement } from "react";

interface SplitContentProps {
  children: ReactElement;
}

export const SplitContent = ({ children }: SplitContentProps) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "50%" },
      }}
    >
      {children}
    </Box>
  );
};

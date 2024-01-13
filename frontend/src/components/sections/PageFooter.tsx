import { Box } from "@mui/material";
import { Section } from "./Section";
import { DARKTEAL } from "../../colors";

export const PageFooter = () => {
  return (
    <>
      <Box
        sx={{
          height: "200px",
          width: "100%",
          backgroundImage: "url(dots-teal.png)",
          backgroundSize: "390px 200px",
          backgroundRepeat: "repeat-x",
        }}
      />
      <Box sx={{ width: "100%", backgroundColor: "#CBFFFC" }}>
        <Section>
          <>
            <h1>Waill.</h1>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "15px",
                marginBottom: "50px",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", sm: "250px" },
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                <Box>
                  A project by{" "}
                  <span style={{ whiteSpace: "nowrap" }}>Felix Kniest</span>
                </Box>
                <Box sx={{ opacity: ".7" }}>contact@waill.net</Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  justifyContent: "center",
                }}
              >
                {/* <Box>
                  <a href="/">Imprint</a>
                </Box>

                <Box
                  sx={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    backgroundColor: DARKTEAL,
                  }}
                /> */}
                <Box>
                  <a href="/privacy">Privacy Policy</a>
                </Box>

                <Box
                  sx={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    backgroundColor: DARKTEAL,
                  }}
                />
                <Box>
                  <a href="/terms">Terms of Service</a>
                </Box>
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", sm: "250px" },
                  textAlign: { xs: "center", sm: "right" },
                }}
              >
                Waill preview v.24.0.1
              </Box>
            </Box>
          </>
        </Section>
      </Box>
    </>
  );
};

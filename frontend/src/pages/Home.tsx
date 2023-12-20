import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";

function Home() {
  const { logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  return (
    <Box>
      <header className="App-header">
        {/*<img src="waill-wide.png" alt="well, logo of the app" style={{
        height: "100vh", 
        width: "100vw",
        position: "absolute",
        bottom: "0",
        right: "0"
      }} />*/}
        <Box
          sx={{
            width: { xs: "180vw", sm: "160vw", md: "130vw" },
            height: { xs: "80vh", md: "120vh" },
            position: "absolute",
            borderRadius: "50%",
            left: { xs: "-50vw", sm: "-60vw", md: "-80vw" },
            top: "-50vh",
            backgroundColor: "#eafff3",
            outline: "10px dashed #eafff3 ",
            outlineOffset: "10px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: { xs: "50px", md: "50%" },
            transform: { xs: "", md: "translateY(-50%)" },
            left: { xs: "32px", sm: "40px", md: "70px" },
            right: { xs: "32px", sm: "30vw", md: "40vw", lg: "50vw" },
          }}
        >
          <Box
            className="App-header-text"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "32px", sm: "47px", md: "60px", lg: "70px" },
              lineHeight: { xs: "35px", sm: "50.5px", md: "65px", lg: "75px" },
            }}
          >
            Keep up with your knowledge, use{" "}
            <span className="highlighted-text">Waill.</span>
          </Box>
          <Box
            sx={{
              color: "#72cad8",
              fontSize: { xs: "15px", sm: "20px", md: "24px" },
              margin: "0px",
              marginBottom: { xs: "15px", sm: "20px", md: "30px" },
            }}
          >
            Ask your documents and get your questions answered.
          </Box>
          {!isAuthenticated || isLoading ? (
            <button
              className="primary-button"
              onClick={() => loginWithRedirect()}
            >
              Sign In | Sign Up
            </button>
          ) : (
            <>
              <a
                className="primary-button"
                href="/chat"
                style={{ marginRight: "5px" }}
              >
                Chat
              </a>
              <button
                className="secondary-button"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Sign Out
              </button>
            </>
          )}
        </Box>
      </header>
    </Box>
  );
}

export default Home;

import { useAuth0 } from "@auth0/auth0-react";
import { Box, ImageList, ImageListItem } from "@mui/material";
import { Section } from "../components/sections/Section";
import { SplitContainer } from "../components/sections/SplitContainer";
import { SplitContent } from "../components/sections/SplitContent";
import { DARKTEAL, GRAYTEAL } from "../colors";
import { PageFooter } from "../components/sections/PageFooter";

const imageData = [
  {
    img: "chatScreenshots/input.png",
    title: "chat input",
  },
  {
    img: "chatScreenshots/account settings.png",
    title: "account settings",
  },
  {
    img: "chatScreenshots/navigation.png",
    title: "navigation",
  },
  {
    img: "chatScreenshots/mobile-chat-uploaded.png",
    title: "mob unploaded",
  },
  {
    img: "chatScreenshots/upload.png",
    title: "upload window",
  },
  {
    img: "chatScreenshots/wells.png",
    title: "wells",
  },
  {
    img: "chatScreenshots/mobile-chat-no-messages.png",
    title: "mob no messages",
  },
  {
    img: "chatScreenshots/mobile-chat-uploading.png",
    title: "mob unploading",
  },
  {
    img: "chatScreenshots/mobile-chat-navigation.png",
    title: "mob nav",
  },
];

function Home() {
  const { logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  // detect scroll in to view animations

  // Create the observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear-animation");
      }
    });
  });
  const hiddenElements = document.querySelectorAll(".animate-on-scroll");
  hiddenElements.forEach((el) => observer.observe(el));

  return (
    <Box>
      <header className="App-header">
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
      <Box sx={{ width: "100%", height: "3px", backgroundColor: DARKTEAL }} />
      <Box
        sx={{
          width: "100%",
          background:
            "linear-gradient(180deg, rgba(187,233,242,1) 0%, rgba(234,255,243,1) 44%, rgba(255,240,218,1) 100%)",
        }}
      >
        <Section>
          <Box sx={{ zIndex: 0 }}>
            <h1>Get Started with Waill!</h1>
            <Box
              className="animate-on-scroll"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
                gap: "15px",
                marginBottom: { xs: "20px", md: "0px" },
              }}
            >
              <Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <h2>1.</h2>
                  <p>Start by signing up to Waill!</p>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="primary-button-small"
                    onClick={() => loginWithRedirect()}
                  >
                    Sign In | Sign Up
                  </button>
                </Box>
              </Box>

              <Box
                sx={{
                  position: "relative",
                  width: "fit-content",
                  maxWidth: { xs: "260px", sm: "270px", md: "300px" },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    height: "100%",
                    width: "90%",
                    backgroundColor: GRAYTEAL,
                    borderRadius: "20px",
                    zIndex: 0,
                    filter: "blur(20px)",
                    opacity: ".7",
                  }}
                />
                <img
                  src="guide/Sign In.png"
                  alt="sign in"
                  style={{
                    maxWidth: "100%",
                    borderRadius: "20px",
                    transform: "rotate(4deg)",
                  }}
                />
              </Box>
            </Box>

            <Box
              className="animate-on-scroll"
              sx={{
                display: "flex",
                flexDirection: { xs: "column-reverse", md: "row" },
                justifyContent: "space-evenly",
                width: "100%",
                alignItems: "center",
                gap: "15px",
                marginBottom: { xs: "20px", md: "0px" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "fit-content",
                    maxWidth: { xs: "270px", sm: "370px", md: "430px" },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      height: "100%",
                      width: "90%",
                      backgroundColor: GRAYTEAL,
                      borderRadius: "20px",
                      zIndex: 0,
                      filter: "blur(20px)",
                      opacity: ".7",
                    }}
                  />
                  <img
                    src="guide/OpenAI Key.png"
                    alt="Openai Platform"
                    style={{
                      maxWidth: "100%",
                      borderRadius: "20px",
                      transform: "rotate(-2deg)",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    position: "relative",
                    width: "fit-content",
                    maxWidth: { xs: "200px", sm: "220px", md: "240px" },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      height: "100%",
                      width: "90%",
                      backgroundColor: GRAYTEAL,
                      borderRadius: "20px",
                      zIndex: 0,
                      filter: "blur(20px)",
                      opacity: ".7",
                    }}
                  />
                  <img
                    src="guide/OpenAI Key as default.png"
                    alt="Openai key saved as default"
                    style={{
                      maxWidth: "100%",
                      borderRadius: "20px",
                      transform: "rotate(-1deg)",
                    }}
                  />
                </Box>
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <h2>2.</h2>
                  <p>Create an OpenAI Key and save it as your default</p>
                </Box>
                <Box sx={{ maxWidth: "500px", opacity: "0.7" }}>
                  <p>
                    Create an account or log into your OpenAI account and go to
                    the API page in order to generate a new key in the "API
                    Keys" tab.
                  </p>
                  <p>
                    Afterwards, make sure that your account has access to at
                    least a small amount of money ($5 USD is the lowest accepted
                    amount as of janurary 2024), so that your requests will be
                    processed properly later. You can add to your Balance under
                    Settings / Billing.
                  </p>
                  <p>
                    Save this Key securely and open the account settings in the
                    Waill app, by clicking on your profile in the bottom left of
                    the screen.
                  </p>
                  <p>
                    Paste in your key and click on the check mark to save it.
                  </p>
                </Box>
              </Box>
            </Box>

            <Box
              className="animate-on-scroll"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-evenly",
                width: "100%",
                alignItems: "center",
                gap: "15px",
                marginBottom: { xs: "20px", md: "100px" },
              }}
            >
              <Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <h2>3.</h2>
                  <p>Create a new Well.</p>
                </Box>
                <Box sx={{ maxWidth: "500px", opacity: "0.7" }}>
                  <p>
                    If you have saved your default key correctly, the field
                    should already be filled out!
                  </p>
                  <p>
                    Simply add a name and some basic instructions and create the
                    Well
                  </p>
                  <p>
                    Your Wells will hold the context of your documents, so you
                    will be able to upload multiple documents, for multiple
                    contexts. Also keep in mind that requests made to GPT 4 are
                    substantially more expensive than the cheap requests you
                    will get with GPT 3, when choosing the model you want to use
                    .
                  </p>
                </Box>
              </Box>

              <Box
                sx={{
                  position: "relative",
                  width: "fit-content",
                  maxWidth: { xs: "230px", sm: "260px", md: "280px" },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    height: "100%",
                    width: "90%",
                    backgroundColor: GRAYTEAL,
                    borderRadius: "20px",
                    zIndex: 0,
                    filter: "blur(20px)",
                    opacity: ".7",
                  }}
                />
                <img
                  src="guide/Create Well.png"
                  alt="Create a well"
                  style={{
                    maxWidth: "100%",
                    borderRadius: "20px",
                    transform: "rotate(2deg)",
                  }}
                />
              </Box>
            </Box>

            <Box
              className="animate-on-scroll"
              sx={{
                display: "flex",
                flexDirection: { xs: "column-reverse", md: "row" },
                justifyContent: "space-evenly",
                width: "100%",
                alignItems: "center",
                gap: "15px",
                marginBottom: { xs: "20px", md: "100px" },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "fit-content",
                  maxWidth: { xs: "260px", sm: "340px", md: "380px" },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    height: "100%",
                    width: "90%",
                    backgroundColor: GRAYTEAL,
                    borderRadius: "20px",
                    zIndex: 0,
                    filter: "blur(20px)",
                    opacity: ".7",
                  }}
                />
                <img
                  src="guide/Upload Documents.png"
                  alt="Upload Documents"
                  style={{
                    maxWidth: "100%",
                    borderRadius: "20px",
                    transform: "rotate(-4deg)",
                  }}
                />
              </Box>
              <Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <h2>4.</h2>
                  <p>Upload some documents to your Well.</p>
                </Box>
                <Box sx={{ maxWidth: "500px", opacity: "0.7" }}>
                  <p>
                    Click on the Upload Icon and select some documents you want
                    to use under "Choose Documents".
                  </p>
                  <p>Click on "Upload" and close the pop up once it is done.</p>
                </Box>
              </Box>
            </Box>

            <Box
              className="animate-on-scroll"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-evenly",
                width: "100%",
                alignItems: "center",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              <Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <h2>5.</h2>
                  <p>Ask for anything</p>
                </Box>
                <Box sx={{ maxWidth: "500px", opacity: "0.7" }}>
                  <p>Perfect, you are all done!</p>
                  <p>
                    Give GPT a second to gain access to your document,
                    afterwards you are free to find out key points in your
                    documents faster then ever before!
                  </p>
                </Box>
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: "fit-content",
                  maxWidth: { xs: "260px", sm: "400px", md: "500px" },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    height: "100%",
                    width: "90%",
                    backgroundColor: GRAYTEAL,
                    borderRadius: "20px",
                    zIndex: 0,
                    filter: "blur(20px)",
                    opacity: ".7",
                  }}
                />
                <img
                  src="guide/Ask a Question.png"
                  alt="Ask questions"
                  style={{
                    maxWidth: "100%",
                    borderRadius: "20px",
                    transform: "rotate(2deg)",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Section>
      </Box>

      <Section>
        <>
          <h1>Why use Waill?</h1>
          <SplitContainer>
            <>
              <SplitContent>
                <>
                  <p>
                    Waill is your go-to tool for seamlessly blending your
                    personal documents with GPT Prompts, making information more
                    accessible and tailored just for you! It's as easy as
                    uploading your files – your papers, notes, or any documents
                    you have – and letting Waill extract all the valuable
                    knowledge they hold.
                  </p>
                  <p>
                    Imagine having a smart companion that knows everything
                    within your documents, ready to assist you in a snap.
                    Whether you're a student aiming to boost your research
                    skills, a professional streamlining work processes, or
                    simply someone keen on maximizing personal insights, Waill
                    has got you covered. The best part? You can also use it on
                    your phone, giving you the flexibility to tap into your
                    knowledge base anytime, anywhere.
                  </p>
                  <p>
                    Say goodbye to generic prompts and hello to a more
                    personalized and efficient way of interacting with your own
                    data.
                    <b>Try it now and make your documents work for you!</b>
                  </p>
                </>
              </SplitContent>

              <SplitContent>
                <>
                  <Box
                    sx={{
                      height:
                        "calc(calc(calc(1400px - min(100vw, 1400px)) * 0.24) + 340px)",
                      overflowY: "scroll",
                      display: {
                        xs: "none",
                        sm: "block",
                      },
                    }}
                  >
                    <ImageList variant="masonry" cols={2} gap={8}>
                      {imageData.map((item) => (
                        <ImageListItem key={item.img}>
                          <img
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                            style={{ borderRadius: "10px" }}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>
                  <Box
                    sx={{
                      height: "350px",
                      overflowY: "scroll",
                      display: {
                        xs: "block",
                        sm: "none",
                      },
                    }}
                  >
                    <ImageList variant="masonry" cols={2} gap={8}>
                      {imageData.map((item) => (
                        <ImageListItem key={item.img}>
                          <img
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                            style={{ borderRadius: "10px" }}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>
                </>
              </SplitContent>
            </>
          </SplitContainer>
          <h2>Work with your files comfortably, even on your phone!</h2>
          <Box
            sx={{
              borderRadius: "20px",
              position: "relative",
            }}
            className="animate-on-scroll"
          >
            <Box
              sx={{
                position: "absolute",
                zIndex: -1,
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                height: "100%",
                width: "95%",
                backgroundColor: GRAYTEAL,
                borderRadius: "20px",
                filter: "blur(10px)",
              }}
            />

            <Box
              sx={{
                display: "flex",
                gap: "15px",
                overflow: "hidden",
                borderRadius: "20px",
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", sm: "33%" },
                }}
              >
                <img
                  style={{ width: "100%" }}
                  src="chatScreenshots/mobile-chat-navigation.png"
                  alt="Waill Chat preview"
                />
              </Box>

              <Box sx={{ width: { xs: "100%", sm: "33%" } }}>
                <img
                  style={{ width: "100%" }}
                  src="chatScreenshots/mobile-chat-no-messages.png"
                  alt="Waill Chat preview"
                />
              </Box>

              <Box sx={{ width: { xs: "100%", sm: "33%" } }}>
                <img
                  style={{ width: "100%" }}
                  src="chatScreenshots/mobile-chat-wells.png"
                  alt="Waill Chat preview"
                />
              </Box>
            </Box>
          </Box>
          <p>
            Our website supports a mobile layout, making on the fly lookups or
            uploading files from your phone as easy as opening the chat!
          </p>
        </>
      </Section>
      <PageFooter />
    </Box>
  );
}

export default Home;

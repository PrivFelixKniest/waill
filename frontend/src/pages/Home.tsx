
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const { logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  return (
    <header className="App-header">
      {/*<img src="waill-wide.png" alt="well, logo of the app" style={{
        height: "100vh", 
        width: "100vw",
        position: "absolute",
        bottom: "0",
        right: "0"
      }} />*/}
      <div style={{
        width: "130vw",
        height: "120vh",
        position: "absolute",
        borderRadius: "50%",
        left: "-80vw",
        top: "-50vh",
        backgroundColor: "#eafff3",
        outline: "10px dashed #eafff3 ",
        outlineOffset: "10px"
      }} />
      <div className="App-header-content">
        <h1 className="App-header-text">
          Keep up with your knowledge, use <span className="highlighted-text">Waill.</span>
        </h1>
        <p className="App-header-p">Ask your documents and get your questions answered.</p>
        {(!isAuthenticated || isLoading) ? (
          <button className="primary-button" onClick={() => loginWithRedirect()}>Sign In | Sign Up</button>
        ) : (
          <>
            <a className="primary-button" href="/chat" style={{marginRight: "5px"}}>Chat</a>
            <button className="secondary-button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Sign Out</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Home;

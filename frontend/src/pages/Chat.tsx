import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

function Chat() {
  const {isAuthenticated, isLoading} = useAuth0()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated, isLoading])

  if (!isLoading && isAuthenticated) {
    return (
      <div>
        <h1>This is the Chat page</h1>
      </div>
    );
  }
  return (
    <div style={{width: "100vw", height: "100vh", position: "relative"}}>
      <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
        Loading ...
      </div>
    </div>
  )
}

export default Chat;
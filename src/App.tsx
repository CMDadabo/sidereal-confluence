import LaunchScreen from "./screens/LaunchScreen/LaunchScreen";

import "./reset.css";
import "./index.css";
import { ConnectionStateContext } from "./providers/ConnectionStateProvider";
import { ReactElement, useContext, useState } from "react";

function App() {
  const [boardgameIoClient, setBoardgameIoClient] = useState<ReactElement>();
  const { isConnected } = useContext(ConnectionStateContext);

  return (
    <>
      {!boardgameIoClient && (
        <LaunchScreen setBoardgameIoClient={setBoardgameIoClient} />
      )}
      {boardgameIoClient && (
        <div className={isConnected ? "visible" : "invisible"}>
          {boardgameIoClient}
        </div>
      )}
    </>
  );
}

export default App;

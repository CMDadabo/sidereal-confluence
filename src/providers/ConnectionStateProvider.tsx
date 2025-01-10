import { createContext, useState } from "react";

interface ConnectionStateContextType {
  isConnected: boolean;
  setIsConnected?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConnectionStateContext = createContext<ConnectionStateContextType>(
  {
    isConnected: false,
  }
);

const ConnectionStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <ConnectionStateContext.Provider value={{ isConnected, setIsConnected }}>
      {children}
    </ConnectionStateContext.Provider>
  );
};
export default ConnectionStateProvider;

import { ReactNode, createContext, useEffect, useState } from "react";
import {
  SpaceFlightContextType,
  SpaceFlightInterface,
} from "../interfaces/SpaceFlightInterface";

export const SpaceFlightContext = createContext<
  SpaceFlightContextType | undefined
>(undefined);

interface SpaceFlightContextProviderProps {
  children: ReactNode;
}

const SpaceFlightContextProvider: React.FC<SpaceFlightContextProviderProps> = ({
  children,
}) => {
  const [allSpaceFlights, setAllSpaceFlights] = useState<
    SpaceFlightInterface[]
  >([]);
  const [loader, setLoader] = useState(false);

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL as string;

  const fetchData = () => {
    setLoader(true);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((json: SpaceFlightInterface[]) => {
        setAllSpaceFlights(json);
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SpaceFlightContext.Provider value={{ allSpaceFlights, loader }}>
      {children}
    </SpaceFlightContext.Provider>
  );
};

export default SpaceFlightContextProvider;

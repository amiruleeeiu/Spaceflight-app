import { createContext, useEffect, useState } from "react";

export const SpaceFlightContext = createContext();

const SpaceFlightContextProvider = ({ children }) => {
  const [allSpaceFlights, setAllSpaceFlights] = useState([]);
  const [loader, setLoader] = useState(false);

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const fetchData = () => {
    setLoader(true);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        setAllSpaceFlights(json);
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SpaceFlightContext.Provider value={{ allSpaceFlights, loader }}>
      {children}
    </SpaceFlightContext.Provider>
  );
};

export default SpaceFlightContextProvider;

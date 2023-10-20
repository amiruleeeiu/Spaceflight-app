import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpaceFlightContextProvider from "./context/SpaceFlight";
import Spaceflights from "./pages/Spaceflights";

function App() {
  return (
    <SpaceFlightContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Spaceflights />} />
        </Routes>
      </BrowserRouter>
    </SpaceFlightContextProvider>
  );
}

export default App;

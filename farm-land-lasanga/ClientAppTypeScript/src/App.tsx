import React from "react";
import "./App.css";
import MapWithLeaflet from "./components/MapWithLeaflet";
import MapWithMapbox from "./components/MapWithMapbox";

/**
 * TODO Add dynamic React routing for the different maps.
 */
const App: React.FC = () => {
  return (
    <div className="App">
      <MapWithMapbox />
      <MapWithLeaflet />
    </div>
  );
};

export default App;

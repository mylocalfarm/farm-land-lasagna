import React from "react";
import MapWithLeaflet from "./components/MapWithLeaflet";
import MapWithMapbox from "./components/MapWithMapbox";
import { BrowserRouter as Router, Route } from "react-router-dom";
/**
 * TODO Add dynamic React routing for the different maps.
 */
const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/mapbox" component={MapWithMapbox} />
        <Route path="/leaflet" component={MapWithLeaflet} />
      </Router>
    </div>
  );
};

export default App;

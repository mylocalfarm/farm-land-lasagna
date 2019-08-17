import React from "react";
import MapWithLeaflet from "./components/MapWithLeaflet";
import MapWithMapbox from "./components/MapWithMapbox";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
/**
 * TODO Add dynamic React routing for the different maps.
 */
const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <ul>
          <li>
            <Link to="/mapbox">Mapbox</Link>
          </li>
          <li>
            <Link to="/leaflet">Leaflet</Link>
          </li>
        </ul>
        <section>
          <Route path="/" exact component={MapWithMapbox} />
          {/* 
            Comparison of Mapbox, Mapbox-GL, and Leaflet
            https://stackoverflow.com/a/35070443/1108891
          */}
          <Route path="/mapbox" component={MapWithMapbox} />
          <Route path="/leaflet" component={MapWithLeaflet} />
        </section>
      </Router>
    </div>
  );
};

export default App;

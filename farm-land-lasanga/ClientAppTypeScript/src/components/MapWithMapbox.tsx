import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

const mapboxAccessToken =
  "pk.eyJ1IjoibXlsb2NhbGZhcm0iLCJhIjoiY2p5eHE3eHBzMWUxazNjb3ptcHk2OWx3YiJ9.OEbf6j5a-YzNara0zUHHMA";

const MapWithMapbox: React.FC = () => {
  const container = React.createRef<HTMLDivElement>();

  useEffect(() => {
    mapboxgl.accessToken = mapboxAccessToken;
    if (!container.current) return;

    new mapboxgl.Map({
      container: container.current,
      style: "mapbox://styles/mapbox/streets-v11"
    });
  }, [container]);

  return <div className="map-container" ref={container} />;
};

export default MapWithMapbox;

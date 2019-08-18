import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

const mapboxAccessToken =
  "pk.eyJ1IjoibXlsb2NhbGZhcm0iLCJhIjoiY2p5eHE3eHBzMWUxazNjb3ptcHk2OWx3YiJ9.OEbf6j5a-YzNara0zUHHMA";

const MapWithMapbox: React.FC = () => {
  const container = React.createRef<HTMLDivElement>();

  useEffect(() => {
    mapboxgl.accessToken = mapboxAccessToken;
    if (!container.current) return;

    const map = new mapboxgl.Map({
      container: container.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-123.5, 48.8],
      zoom: 10
    });

    map.on("load", function() {
      map.addSource("testData", {
        type: "geojson",
        data: "/api/sampleData/GeoJSON"
      });

      map.addLayer({
        id: "test",
        type: "line",
        source: "testData",
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#888",
          "line-width": 8
        }
      });
    });
  }, [container]);

  return <div className="map-container" ref={container} />;
};

export default MapWithMapbox;

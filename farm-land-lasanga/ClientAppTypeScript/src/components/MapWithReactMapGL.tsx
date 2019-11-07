import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import FarmDetails from './FarmDetails';

import * as FarmData from '../data/data-sample.json';

const mapboxAccessToken =
  process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?
    process.env.REACT_APP_MAPBOX_ACCESS_TOKEN :
    "pk.eyJ1IjoibXlsb2NhbGZhcm0iLCJhIjoiY2p5eHE3eHBzMWUxazNjb3ptcHk2OWx3YiJ9.OEbf6j5a-YzNara0zUHHMA";

const MapWithReactMapGL = () => {
  const [viewport, setViewport] = useState({
    latitude: 48.84,
    longitude: -123.5,
    width: '100vw',
    height: '100vh',
    zoom: 11
  });
  const [farmData, setFarmData] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);

  useEffect(() => {
    // Let ESCAPE key close the popup
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedFarm(null);
      }
    }
    window.addEventListener("keydown", listener);

    // Load Farm Data
    axios.get("https://localhost:5001/api/geojson/alr").then(res => {
      setFarmData(parseFarmData(res.data));
    });

    return () => {
      window.removeEventListener("keydown", listener);
    }
  }, []);

  const parseFarmData = (data: any) => {
    return data.features.map((feature: any) => {
      return {
        id: feature.properties.id,
        name: feature.properties.NAME,
        coordinates: [
          feature.geometry.coordinates[0][0][0][1],
          feature.geometry.coordinates[0][0][0][0]
        ],
        shape: feature.properties.SHAPE_Area,
        length: feature.properties.SHAPE_Leng,
        status: feature.properties.STATUS
      }
    });
  }

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={mapboxAccessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => {
          setViewport({
            latitude: viewport.latitude,
            longitude: viewport.longitude,
            width: '100vw',
            height: '100vh',
            zoom: viewport.zoom
          });
        }}
      >
        {farmData.map((farm: any) => (
          <Marker
            key={farm.id}
            latitude={farm.coordinates[0]}
            longitude={farm.coordinates[1]}
          >
            <button
              className="marker"
              onClick={e => {
                e.preventDefault();
                setSelectedFarm(farm);
              }}
            >
              <img src="/images/farm-icon.svg" alt="Farm Icon" />
            </button >
          </Marker>
        ))}

        {/*         {selectedFarm ? (
          <Popup
            latitude={selectedFarm.geometry.coordinates[0][0][0][1]}
            longitude={selectedFarm.geometry.coordinates[0][0][0][0]}
            onClose={() => {
              setSelectedFarm(null);
            }}
          >
            <FarmDetails farm={selectedFarm} />
          </Popup>
        ) : null} */}
      </ReactMapGL>
      }
    </div >
  )
}

export default MapWithReactMapGL;
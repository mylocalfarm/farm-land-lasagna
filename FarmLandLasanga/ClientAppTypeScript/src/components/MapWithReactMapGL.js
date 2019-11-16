import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import * as FarmData from '../data/data-sample.json'
import FarmDetails from './FarmDetails'

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
  const [selectedFarm, setSelectedFarm] = useState(null);

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
        {FarmData.features.map(feature => (
          <Marker
            key={feature.properties.id}
            latitude={feature.geometry.coordinates[0][0][0][1]}
            longitude={feature.geometry.coordinates[0][0][0][0]}
          >
            <button
              className="marker"
              onClick={e => {
                e.preventDefault();
                setSelectedFarm(feature);
                console.log(feature);
              }}
            >
              <img src="/images/farm-icon.svg" alt="Farm Icon" />
            </button >
          </Marker>
        ))}

        {selectedFarm ? (
          <Popup
            latitude={selectedFarm.geometry.coordinates[0][0][0][1]}
            longitude={selectedFarm.geometry.coordinates[0][0][0][0]}
            onClose={() => {
              setSelectedFarm(null);
            }}
          >
            <FarmDetails farm={selectedFarm} />
          </Popup>
        ) : null}
      </ReactMapGL>
    </div >
  )
}

export default MapWithReactMapGL;
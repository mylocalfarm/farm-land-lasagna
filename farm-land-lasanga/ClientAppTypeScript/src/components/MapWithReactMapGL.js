import React, { useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import * as FarmData from '../data/data-sample.json'
import FarmIcon from './FarmIcon.js'

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
  })

  function handleIconClick(details) {
    alert(details);
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
        {FarmData.features.map(feature => (
          <Marker
            key={feature.properties.id}
            latitude={feature.geometry.coordinates[0][0][0][1]}
            longitude={feature.geometry.coordinates[0][0][0][0]}
          >
            <FarmIcon handleClick={handleIconClick} farmName={feature.properties.NAME} />
          </Marker>
        ))}
      </ReactMapGL>
    </div >
  )
}

export default MapWithReactMapGL;
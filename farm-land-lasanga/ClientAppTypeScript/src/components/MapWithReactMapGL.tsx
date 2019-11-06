import React, { useState } from 'react'
import ReactMapGL from 'react-map-gl'

const mapboxAccessToken =
  process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?
    process.env.REACT_APP_MAPBOX_ACCESS_TOKEN :
    "pk.eyJ1IjoibXlsb2NhbGZhcm0iLCJhIjoiY2p5eHE3eHBzMWUxazNjb3ptcHk2OWx3YiJ9.OEbf6j5a-YzNara0zUHHMA";

export default function MapWithReactMapGL() {
  const [viewport, setViewport] = useState({
    latitude: 48.84,
    longitude: -123.5,
    width: '100vw',
    height: '100vh',
    zoom: 11
  })

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={mapboxAccessToken}
        onViewportChange={viewport => {
          console.log(viewport);
          setViewport({
            latitude: viewport.latitude,
            longitude: viewport.longitude,
            width: '100vw',
            height: '100vh',
            zoom: viewport.zoom
          });
        }}
      >

      </ReactMapGL>
    </div>
  )
}


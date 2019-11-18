import React, { useState, useEffect } from 'react'
import axios from 'axios';
// @ts-ignore
import ReactMapGL, { Marker, Popup, Source, Layer } from 'react-map-gl'
import FarmDetails from './FarmDetails';
import styled from 'styled-components';
import {
  color1,
  color2,
  color5,
  white,
  lightGrey,
  darkGrey
} from '../theme/theme';
interface IFarm {
  name: string;
  coordinates: number[];
  area: number;
  length: number;
  status: string;
}

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
  const [farmData, setFarmData] = React.useState<[] | null>(null);
  const [geoJsonFarmData, setGeoJsonFarmData] = React.useState<[] | null>(null);
  const [selectedFarm, setSelectedFarm] = React.useState<IFarm | null>(null);
  const [landLayerVisibility, setLandLayerVisibility] = React.useState<string>("visible");
  const [boundLayerVisibility, setBoundLayerVisibility] = React.useState<string>("visible");
  const [farmLayerVisibility, setFarmLayerVisibility] = React.useState<boolean>(true);
  const [popupClass, setPopupClass] = React.useState<string>("popup-closed");

  const popup = React.createRef();

  useEffect(() => {
    // Let ESCAPE key close the popup
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedFarm(null);
      }
    }
    window.addEventListener("keydown", listener);

    // Load Farm Data
    axios.get("/api/geojson/alr").then(res => {
      setFarmData(parseFarmData(res.data));
      setGeoJsonFarmData(res.data);
    });

    return () => {
      window.removeEventListener("keydown", listener);
    }
  }, []);

  const parseFarmData = (data: any) => {
    console.log(data);
    return data.features.map((feature: any) => {  // TODO create an interface
      return {
        id: feature.properties.id,
        name: feature.properties.NAME,
        coordinates: [
          feature.geometry.coordinates[0][0][0][1],
          feature.geometry.coordinates[0][0][0][0]
        ],
        area: feature.properties.SHAPE_Area,
        length: feature.properties.SHAPE_Leng,
        status: feature.properties.STATUS
      }
    });
  }

  // TODO
  /* This can be improved a lot, instead of a function for
     each layer let's make it one function that the layer gets
     passed the function to run */
  const toggleLandLayer = () => {
    if (landLayerVisibility === "visible") {
      setLandLayerVisibility("none");
    } else if (landLayerVisibility === "none") {
      setLandLayerVisibility("visible");
    }
  }

  const toggleBoundLayer = () => {
    if (boundLayerVisibility === "visible") {
      setBoundLayerVisibility("none");
    } else if (boundLayerVisibility === "none") {
      setBoundLayerVisibility("visible");
    }
  }

  const toggleMarkerLayer = () => {
    setFarmLayerVisibility(!farmLayerVisibility);
  }

  const closePopup = () => {
    setPopupClass("popup-closed");
  }

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={mapboxAccessToken}
        mapStyle={"mapbox://styles/mapbox/streets-v11"}
        onViewportChange={viewport => {
          setViewport({
            latitude: viewport.latitude,
            longitude: viewport.longitude,
            width: '100%',
            height: '100%',
            zoom: viewport.zoom
          });
        }}
      >
        <Source id="farmland" type="geojson" data={geoJsonFarmData}>
          <Layer
            id="farmLand"
            type="fill"
            visible="none"
            paint={{
              "fill-color": `${color2}`
            }}
            layout={{
              "visibility": `${landLayerVisibility}`
            }} />
          <Layer
            id="farmLandBounds"
            type="line"
            paint={{
              "line-color": `${color1}`,
              "line-width": 2
            }}
            layout={{
              "line-join": "round",
              "line-cap": "round",
              "visibility": `${boundLayerVisibility}`
            }} />
        </Source>
        {farmLayerVisibility && farmData && farmData.map((farm: any) => (
          <Marker
            key={farm.id}
            latitude={farm.coordinates[0]}
            longitude={farm.coordinates[1]}
          >
            <button
              className="marker"
              onClick={e => {
                e.preventDefault();
                setPopupClass("popup-open");
                setSelectedFarm(farm);
              }}
            >
            </button >
          </Marker>
        ))}

        {selectedFarm &&
          <Popup
            className={popupClass}
            latitude={selectedFarm.coordinates[0]}
            longitude={selectedFarm.coordinates[1]}
            onClose={() => {
              closePopup();
            }}
          >
            <FarmDetails farm={selectedFarm} />
          </Popup>
        }
      </ReactMapGL>
      <StyledLayers>
        {/*
          //TODO
          The checkboxes are actually backwards because I need to set the default value to checked without affecting the styling. Must be a way to bind it to the state
        */}
        <h1>LAYERS</h1>
        <div>
          <input id="landLayer" type="checkbox" onChange={toggleLandLayer} />
          <label htmlFor="landLayer">AREA</label>
        </div>
        <div>
          <input id="boundLayer" type="checkbox" onChange={toggleBoundLayer} />
          <label htmlFor="boundLayer">LAND LINES</label>
        </div>
        <div>
          <input id="farmMarkers" type="checkbox" onChange={toggleMarkerLayer} />
          <label htmlFor="farmMarkers">FARM MARKERS</label>
        </div>
      </StyledLayers>
    </div>
  )
}

export default MapWithReactMapGL;

const StyledLayers = styled.div`
  color: ${color1};
  background-color: ${color5};
  box-shadow: 1px 1px 15px 1px rgba(0,0,0,.2);
  border-radius: 3px;
  position: absolute;
  top: 3rem;
  right: 3rem;
  width: 242px;
  opacity: .9;
  transition: all .2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    opacity: 1;
  }

  h1 {
    font-size: 1.8rem;
    font-weight: 700;
    padding: 1rem 2rem;
    text-align: center;
  }

  div {
    height: 5rem;
    padding-left: 6rem;
  }

  input[type=checkbox]{
    display: none;
  }

  input[type=checkbox]:checked + label {
    color: ${lightGrey};

    &::before {
      background-color: ${lightGrey};
    }
    &::after {
      transform: translate(-3rem, .1rem);
    }
  }

  label {
    color: ${color1};
    display: block;
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 300;
    cursor: pointer;
    transition: all .3s ease;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      transform: translateX(-3.6rem);
      width: 2.5rem;
      height: 2rem;
      border-radius: 1rem;
      background-color: ${color2};
      transition: all .3s ease;
      box-shadow: inset -1px -1px 1px 1px rgba(0,0,0,.2);
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      transform: translate(-3.5rem, .1rem);
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 1rem;
      background-color: ${white};
      box-shadow: inset 1px 1px 1px 1px rgba(0,0,0,.2);
      transition: all .3s ease;
    }
  }
`;
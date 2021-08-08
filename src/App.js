import React from 'react';
import DeckGL from '@deck.gl/react';
import {MapView, FirstPersonView} from '@deck.gl/core';
import {StaticMap} from 'react-map-gl';
import { LineLayer } from '@deck.gl/layers';

import './App.css';

const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

const data = [
  {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
];

function App() {
  const layers = [
    new LineLayer({id: 'line-layer', data})
  ];

  return (
    <>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}>
        <MapView id='map' width='50%' controller={true}>
          <StaticMap mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}></StaticMap>
        </MapView>
      </DeckGL>
    </>
  );
}

export default App;

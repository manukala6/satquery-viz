import React from 'react';
import DeckGL from '@deck.gl/react';
import {MapView } from '@deck.gl/core';
import { StaticMap, NavigationControl, MapContext } from 'react-map-gl';
import { LineLayer } from '@deck.gl/layers';

import { useState, useCallback, useRef } from 'react';
import {Editor, DrawRectangleMode, EditingMode} from 'react-map-gl-draw';
import {getFeatureStyle, getEditHandleStyle} from './style';
import InfoPanel from './components/InfoPanel';

import './App.css';

const INITIAL_VIEW_STATE = {
  latitude: 36.75,
  longitude: -119.8,
  zoom: 9,
  bearing: 0,
  pitch: 0
};

const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 10,
  left: 10
};

const data = [
  {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
];

function App() {
  const layers = [
    new LineLayer({id: 'line-layer', data})
  ];

    // map feature CRUD
    const [mode, setMode] = useState(null);
    const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(null);
    const editorRef = useRef(null);
    const onSelect = useCallback(options => {
      setSelectedFeatureIndex(options && options.selectedFeatureIndex)
    }, [])
    const onDelete = useCallback(() => {
      if (selectedFeatureIndex != null & selectedFeatureIndex >= 0) {
        editorRef.current.deleteFeatures(selectedFeatureIndex);
      }
    }, [selectedFeatureIndex]);
    const onUpdate = useCallback(({editType}) => {
      if (editType === 'addFeature') {
        setMode(new EditingMode());
      }
    }, []);

    // feature array
    const features = editorRef.current && editorRef.current.getFeatures();
    const selectedFeature = features && (features[selectedFeatureIndex] || features[features.length - 1]);
  
    // drawing editor tools
    const drawTools = (
      <div className="mapboxgl-ctrl-top-left">
        <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
          <button
            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon"
            title="Polygon tool (p)"
            onClick={() => setMode(new DrawRectangleMode())}
          />
          <button
            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash"
            title="Delete"
            onClick={onDelete}
          />
        </div>
      </div>
    )
  return (
    <>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        ContextProvider={MapContext.Provider}
        layers={layers}>
        <MapView id='map' width='100%' controller={true}>
          <StaticMap mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}></StaticMap>
          <NavigationControl className='navPanel' style={NAV_CONTROL_STYLE} />
          <Editor
            ref={editorRef}
            style={{width: '100%', height: '100%'}}
            clickRadius={12}
            mode={mode}
            onSelect={onSelect}
            onUpdate={onUpdate}
            editHandleShape={'circle'}
            featureStyle={getFeatureStyle}
            editHandleStyle={getEditHandleStyle}
          />
          <InfoPanel className='infoPanel' polygon={selectedFeature}/>
          {drawTools}
        </MapView>
      </DeckGL>
    </>
  );
}

export default App;

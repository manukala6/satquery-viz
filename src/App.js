// react imports
import React from 'react';
import { useState, useCallback, useRef, useReducer } from 'react';

// dependency imports
import DeckGL from '@deck.gl/react';
import { BitmapLayer } from '@deck.gl/layers';
import { MapView } from '@deck.gl/core';
import { StaticMap, NavigationControl, MapContext } from 'react-map-gl';
import { Editor, DrawRectangleMode, EditingMode } from 'react-map-gl-draw';
import bbox from '@turf/bbox';
import area from '@turf/area';

// local imports
import {getFeatureStyle, getEditHandleStyle} from './style';
import InfoPanel from './components/InfoPanel';
import ControlPanel from './components/ControlPanel';

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

function App() {

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

    // DeckGL layers
    const [pngData, setPngData] = useState(null);
    const [bounds, setBounds] = useState(null);
    const [layers, setLayers] = useState([]);

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
    
    // query properties form
    const formReducer = (state, event) => {
      return {
          ...state,
          [event.name]: event.value
      }
    }
    const [formData, setFormData] = useReducer(formReducer, {
      startDate: '2021-06-01',
      endDate: '2021-06-21',
      cloudCover: 5,
      satellite: 'Sentinel-2',
      index: 'NDVI'
    })
    const [submitForm, setSubmitForm] = useState(false);
    const handleChange = (event) => {
      setFormData({
        name: event.target.name,
        value: event.target.value
      })
    }

    async function postItem(url, data) {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => {
        return res.json()
      })
      .then(data => {
        return `https://satquery-dec-test.s3.amazonaws.com/${data._id}/0_${data._id}.png`
      })
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      setSubmitForm(true);
      const jsonData = {};
      jsonData['bbox'] = bbox(selectedFeature);
      jsonData['start_date'] = formData.startDate;
      jsonData['end_date'] = formData.endDate;
      jsonData['cloud_cover'] = formData.cloudCover;
      jsonData['satellite'] = formData.satellite;
      jsonData['area_m'] = area(selectedFeature);
      console.log(JSON.stringify(jsonData));

      postItem('http://127.0.0.1:8008/items/', jsonData).then(data => {;  
        const layer = new BitmapLayer({
          id: 'bitmap-layer',
          image: data,
          bounds: bbox(selectedFeature)
        })
        setLayers([layer]);
      });

    }

    
  return (
    <>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        ContextProvider={MapContext.Provider}
        layers={layers}
      >
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
          <InfoPanel polygon={selectedFeature}/>
          <ControlPanel 
            formData={formData} 
            submitForm={submitForm} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit}
          />
          {drawTools}
        </MapView>
      </DeckGL>
    </>
  );
}

export default App;

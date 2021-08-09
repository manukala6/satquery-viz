import React from 'react';
import area from '@turf/area';
import '../App.css'

const CONTROL_PANEL_STYLE = {
    position: 'absolute',
    top: 10,
    right: 10,
    background: 'rgba(76, 175, 80, 0.25)',
    padding: 5,
  }
  
function InfoPanel({ polygon }) {
  const polygonArea = polygon && area(polygon) / 1000000;

  return (
    <div className='infoPanel' style={CONTROL_PANEL_STYLE}>
      <h1>Satquery-Viz</h1>
      {polygon && (
        <h3>
          Selected polygon area:
          <p>{polygonArea.toFixed(2)} sq. km</p>
        </h3>
      )}
    </div>
  );
}

export default React.memo(InfoPanel);

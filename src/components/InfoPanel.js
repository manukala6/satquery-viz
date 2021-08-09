import React from 'react';
import area from '@turf/area';
import '../App.css'

const CONTROL_PANEL_STYLE = {
    position: 'absolute',
    top: 10,
    right: 10,
    
    fontFamily: "20px Padauk,sans-serif"
  }
  
function InfoPanel({ polygon }) {
  const polygonArea = polygon && area(polygon) / 1000000;

  return (
    <div className='infoPanel' style={CONTROL_PANEL_STYLE}>
      <h3>Draw Polygon</h3>
      {polygon && (
        <p>
          {polygonArea.toFixed(2)} sq. km
        </p>
      )}
    </div>
  );
}

export default React.memo(InfoPanel);

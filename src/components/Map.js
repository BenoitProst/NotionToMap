import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import stores from './ListingParsing';
import identification from '../param/id.json';
import '../styles/Map.css'

function Map() {
mapboxgl.accessToken = identification.TokenMapbox;

const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-77.034084);
const [lat, setLat] = useState(38.909671);
const [zoom, setZoom] = useState(13);

function flyToLocation(currentFeature) {
    map.current.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });
  };
  
function createPopUp(currentFeature) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();
  
    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(`<h3>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4>`)
      .addTo(map.current);
  };


useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [lng, lat],
    zoom: zoom
    });
});

useEffect(() => {
    map.current.on('load', () => {
        /* Add the data to your map as a layer */
        map.current.addLayer({
          id: 'locations',
          type: 'circle',
          /* Add a GeoJSON source containing place coordinates and information. */
          source: {
            type: 'geojson',
            data: stores
          }
        });
      });
});

useEffect(() => {
    map.current.on('click', (event) => {
        /* Determine if a feature in the "locations" layer exists at that point. */
        const features = map.current.queryRenderedFeatures(event.point, {
          layers: ['locations']
        });
      
        /* If it does not exist, return */
        if (!features.length) return;
      
        const clickedPoint = features[0];
      
        /* Fly to the point */
        flyToLocation(clickedPoint);
      
        /* Close all other popups and display popup for clicked store */
        createPopUp(clickedPoint);
    
      });


});
return (
    <div>
    <div ref={mapContainer} className="map-container" />
    </div>
    );
}

export default Map
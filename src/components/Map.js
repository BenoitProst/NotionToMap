import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import stores from '../data/GeolocStore.json'

function Map() {
mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuaXRvLWdlbyIsImEiOiJjbG0zcHA5dnAyNGJpM2VwM2Z6dDloeHp0In0.wJcDBpyTsem-y6hqz8cXnA';

const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-77.034084);
const [lat, setLat] = useState(38.909671);
const [zoom, setZoom] = useState(13);


/* Assign a unique ID to each store */
stores.features.forEach(function (store, i) {
    store.properties.id = i;
  });


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

return (
    <div>
    <div ref={mapContainer} className="map-container" />
    </div>
    );
}

export default Map
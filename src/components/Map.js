import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax


import identification from '../param/id.json';
import '../styles/Map.css'

function Map({data, setdata}) {
mapboxgl.accessToken = identification.TokenMapbox;

const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(2.3760);
const [lat, setLat] = useState(48.8608);
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
      .setHTML(`<h3>${currentFeature.properties.Name}</h3><h4>${currentFeature.properties.Style.map((style, index) => (
        `<div><span class="tag ${style.color}" key={popup-${style.id}}>${style.name}</span></div>`)).join('')}</h4>`)
      .addTo(map.current);
  };

function addMarkers() {
  /* For each feature in the GeoJSON object above: */
  for (const marker of data) {
  /* Create a div element for the marker. */
  const el = document.createElement('div');
  /* Assign a unique `id` to the marker. */
  el.id = `marker-${marker.properties.id}`;
  /* Assign the `marker` class to each marker for styling. */
  el.className = 'marker';
  
  el.addEventListener('click', (e) => {
    /* Fly to the point */
    flyToLocation(marker);
    /* Close all other popups and display popup for clicked store */
    createPopUp(marker);
    /* Highlight listing in sidebar */
    const activeItem = document.getElementsByClassName('active');
    e.stopPropagation();
    if (activeItem[0]) {
      activeItem[0].classList.remove('active');
    }
    const listing = document.getElementById(`listing-${marker.properties.id}`);
    listing.classList.add('active');
  });
  /**
  * Create a marker using the div element
  * defined above and add it to the map.
  **/
  new mapboxgl.Marker(el, { offset: [0, -23] })
  .setLngLat(marker.geometry.coordinates)
  .addTo(map.current);
  }};

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
        if (map.current.getSource("places")) {
          map.current.removeSource("places");
      }
        map.current.addSource('places', {
          type: 'geojson',
          data: data
        });
        addMarkers();
      });
});



const handleClick = event => {
  for (const feature of data) {
    if (event.currentTarget.id === `link-${feature.properties.id}`) {
      flyToLocation(feature);
      createPopUp(feature);
    }
  }
  const activeItem = document.getElementsByClassName('active');
  if (activeItem[0]) {
    activeItem[0].classList.remove('active');
  }
  event.currentTarget.parentNode.classList.add('active');
};


return (
    <div>
      <div class='sidebar'>
        <div class='heading'>
          <h1>Restaurants</h1>
        </div>
        <div id='listings' class='listings'>
        {data.map((restaurant, index) => (
            <div id={`listing-${restaurant.properties.id}`} key={restaurant.properties.id} className = 'item'>
              <a href='#' className = 'title' id = {`link-${restaurant.properties.id}`} 
              onClick={handleClick}>
                {restaurant.properties.Name} 
              </a>
              <div>
              {restaurant.properties.Adresse}
              </div>
              <div>
                {restaurant.properties.Style.map((style, index) => (
                <span class={`tag ${style.color}`} key={`listing-${style.id}`}>{style.name}</span>))}
              </div>
            </div>
        ))}
        </div>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
    );
}

export default Map
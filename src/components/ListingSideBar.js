import React from 'react';

import stores from './ListingParsing';

import '../styles/ListingSideBar.css';
import flyToLocation from './Map';
import createPopUp from './Map';


function ListingSideBar() {

  const handleClick = event => {
    for (const feature of stores.features) {
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
  }
  
  return (
    <div id='listings' class='listings'>
        {stores.features.map((store, index) => (
            <div id={`listing-${store.properties.id}`} key={store.properties.id} className = 'item'>
              <a href='#' className = 'title' id = {`link-${store.properties.id}`} 
              onClick={handleClick}>
                {store.properties.address} 
              </a>
              <div>
              {store.properties.city}
              {store.properties.phone ? ` · ${store.properties.phoneFormatted}` : null} 
              </div>
            </div>
        ))}
    </div>
)
}


export default ListingSideBar


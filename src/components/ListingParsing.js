import stores from '../data/GeolocStore.json';

/* Assign a unique ID to each store */
stores.features.forEach(function (store, i) {
    store.properties.id = i;
  });

export default stores
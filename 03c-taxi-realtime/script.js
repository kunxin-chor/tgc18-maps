const BASE_API_URL = "https://api.data.gov.sg/v1/transport/taxi-availability";

// L.map will create a new map object
// the first argument is the ID of the
// element that will have the
let map = L.map('map');

// set the center of the map
// has 2 arguments
// first argument: the center point 
// second argument: the higher it is
// the more zoomed in the map will be
map.setView([1.3521, 103.8198], 13);

// add the tile layer for the map
// first argument: data source of your map
// second argument: attribution text
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',  // style of the tiles
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

let markerCluster = L.markerClusterGroup();
markerCluster.addTo(map);

async function showTaxiMarkers(){
    let response = await axios.get(BASE_API_URL);
    // console.group(response.data);
    let taxiCoordinates = response.data.features[0].geometry.coordinates;
    for (let taxi of taxiCoordinates) {
        // swap the coordinate around because the API data
        // is in [lng, lat] but we need it [lat, lng] format
        let coordinate = [ taxi[1] , taxi[0]];
        L.marker(coordinate).addTo(markerCluster);
    }
}

// first time render
showTaxiMarkers();

// set a timer in javascript
setInterval(function(){
    // clear all existing markers from the marker cluster
    markerCluster.clearLayers();

    showTaxiMarkers();

}, 30000); // second arg is in milliseconds, 1000ms = 1s

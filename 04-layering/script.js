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

function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng,];
}

// GREEN CIRCLES
let greenCircles = L.layerGroup(); // a layer group is an invisible layer
                                   // it can contain other layers (eg. markers, circles etc.)
for (let i =0; i < 3; i++) {
    L.circle(getRandomLatLng(map),{
        'radius': 400,
        'color': 'green'
    }).addTo(greenCircles)
}
greenCircles.addTo(map);

// RANDOM MARKERS
let markers = L.layerGroup();
for (let i =0; i < 3; i++) {
    L.marker(getRandomLatLng(map)).addTo(markers);
}

// RED CIRCLES
let redCircles = L.layerGroup();
for (let i =0; i < 3; i++) {
    L.circle(getRandomLatLng(map),{
        'radius': 500,
        'color': 'red'
    }).addTo(redCircles)
}

// YELLOW CIRCLES
let yellowCircles = L.layerGroup();
for (let i =0; i < 3; i++) {
    L.circle(getRandomLatLng(map),{
        'radius': 1000,
        'color': 'yellow'
    }).addTo(yellowCircles);
}

// we can create layer control and add it to the map
// only one can be selected for the base layer
let baseLayers = {
    'Green Circles': greenCircles,
    'Markers': markers
}

let overlays = {
    'Red Circles': redCircles,
    'Yellow Circles': yellowCircles
}

L.control.layers(baseLayers, overlays).addTo(map);

document.querySelector("#btnToggle").addEventListener('click', function(){
    // hasLayer function that takes in one layer as an argument
    // if that layer is being displayed in the map, then it will return true
    if(map.hasLayer(greenCircles)) {
        // if the map is showing green circles, then show the markers instead
        map.removeLayer(greenCircles);
        map.addLayer(markers); // show the markers
    } else {
        map.removeLayer(markers);
        map.addLayer(greenCircles);
    }
})
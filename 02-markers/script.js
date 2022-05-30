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

// add the markers
// in leaflet, anything that can be shown on the top of the map is known 
// as a 'layer'
let singapore = L.marker([1.29, 103.85]);
singapore.addTo(map);  // map.addLayer(singapore);

// bind a pop up
singapore.bindPopup(`<h1>Welcome to Singapore</h1>
                <img src="singapore.webp" style="width:100%"/>
`);

// create bukit timah marker
let bukitTimah = L.marker([1.3294,  103.8021]);
bukitTimah.addTo(map);
bukitTimah.addEventListener('click', function(){
    alert("Bukit Timah Nature Reserve: climb till your legs fall off")
})

// circle at mac richte
let mac = L.circle([1.3448, 103.8224],{
    'radius': 200, // radius is in metres
    'color': 'red',
    'fillColor': 'orange',
    'fillOpacity': 0.8
});
map.addLayer(mac); // mac.addTo(map)

mac.bindPopup(`<h1>Lots of water</h1>`)
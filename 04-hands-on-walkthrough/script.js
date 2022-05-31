function createMap() {
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
    return map;
}

async function loadAndDisplayLayer(map, jsonFile) {
    let response = await axios.get(jsonFile);
    let layer = L.layerGroup(); // a layer group can hold other layers
    layer.addTo(map);
    for (let entry of response.data) {
        L.marker(entry.coordinates)
         .bindPopup(`<h1>${entry.name}</h1>`)
         .addTo(layer);
    }
    return layer;
}

async function main() {
    let map = createMap();

    let hdbRequest =  loadAndDisplayLayer(map, "data/hdb.json");
    let mallRequest =  loadAndDisplayLayer(map, "data/malls.json");
    let natureRequest =  loadAndDisplayLayer(map, "data/nature.json");
  
    let hdbLayer = await hdbRequest;
    let mallLayer = await mallRequest;
    let natureLayer = await natureRequest;

    /*
       let layers = await axios.all(hdbRequest, mallRequest, natureRequest);
       let baseLayers = {
        'HDB': layers[0],
        'Malls': layers[1],
        'Nature': layers[2]
       }
    */

    let baseLayers = {
        'HDB': hdbLayer,
        'Malls': mallLayer,
        'Nature': natureLayer
    }

    L.control.layers(baseLayers, {}).addTo(map);
    // Old unfactored code
    // let hdbResponse = await axios.get('data/hdb.json');
    // let hdbLayer = L.layerGroup(); // a layer group can hold other layers
    // hdbLayer.addTo(map);
    // for (let entry of hdbResponse.data) {
    //     L.marker(entry.latlng)
    //      .bindPopup(`<h1>${entry.name}</h1>`)
    //      .addTo(hdbLayer);
    // }

    // let mallResponse = await axios.get('data/malls.json');
    // let mallLayer = L.layerGroup();
    // mallLayer.addTo(map);
    // for(let entry of mallResponse.data) {
    //     L.marker(entry.coordinates)
    //      .bindPopup(`<h1>${entry.name}</h1>`)
    //      .addTo(mallLayer);
    // }

    // let natureResponse = await axios.get('data/nature.json');
    // let natureLayer = L.layerGroup();
    // natureLayer.addTo(map);
    // for(let entry of natureResponse.data) {
    //     L.marker(entry.coordinates)
    //      .bindPopup(`<h1>${entry.name}</h1>`)
    //      .addTo(natureLayer)
    // }
}
main();
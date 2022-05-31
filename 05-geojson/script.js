function createMap(lat, lng) {
    // L.map will create a new map object
    // the first argument is the ID of the
    // element that will have the
    let map = L.map('map');

    // set the center of the map
    // has 2 arguments
    // first argument: the center point 
    // second argument: the higher it is
    // the more zoomed in the map will be
    map.setView([lat, lng], 13);

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

// the window object refers to the browser tab
window.addEventListener('DOMContentLoaded', async function(){
    let map = createMap(1.3521, 103.8198);

    let cyclingResponse = await axios.get('data/cycling.geojson');
    // one argument to L.geoJson: the GeoJSON dat
    // second argument is an options object
    let cyclingLayer = L.geoJson(cyclingResponse.data, {
        // the onEachFeature function will be applied to each feature in response.data
        "onEachFeature": function(feature, layer) {
           // arg 1: the feature data 
           // arg 2: the layer representing the feature on the map
           let divElement = document.createElement('div');
           divElement.innerHTML = feature.properties.Description;
           let columns = divElement.querySelectorAll('td');
           let town = columns[0].innerHTML;
           let agency = columns[1].innerHTML;
           layer.bindPopup(`<h1>${town}</h1><p>Maintained by: ${agency}</p>`);
        }
    }).addTo(map);
    cyclingLayer.setStyle({
        color: 'red'
    })

    let parkResponse = await axios.get('data/nparks.geojson');
    let parkLayer = L.geoJson(parkResponse.data,{
        'onEachFeature': function(feature, layer) {
            let divElement = document.createElement('div');
            divElement.innerHTML = feature.properties.Description;
            let columns = divElement.querySelectorAll('td');
            let town = columns[0].innerHTML;
            let agency = columns[1].innerHTML;
            layer.bindPopup(`<h1>${town}</h1><p>Maintained by: ${agency}</p>`);
        }
    }).addTo(map);
    parkLayer.setStyle({
        color: 'green'
    })

    L.control.layers({},{
        'Cycling': cyclingLayer,
        'Park Tracks': parkLayer
    }).addTo(map);


})




window.addEventListener('DOMContentLoaded', async function () {
    let map = createMap(1.3521, 103.8198);
    let searchResultLayer = L.layerGroup();
    searchResultLayer.addTo(map)

    document.querySelector('#btnSearch').addEventListener('click', async function () {

        // clear existing markers from the search result layer
        searchResultLayer.clearLayers(); //<-- will delete all layers inside it

        // clear existing search results
        document.querySelector('#results').innerHTML = "";

        let query = document.querySelector('#txtSearch').value;
        let latlng = map.getBounds().getCenter();
        let locations = await search(latlng.lat, latlng.lng, query, 4000);
        for (let result of locations.results) {

            // create markers and put on map
            let lat = result.geocodes.main.latitude;
            let lng = result.geocodes.main.longitude;

            let marker = L.marker([lat, lng]).addTo(searchResultLayer);

            marker.bindPopup(`<h1>${result.name}</h1>
           <p>${result.location.address} 
           ${result.location.address_extended ? ", " + result.location.address_extended
                    : ""}</p>`)

            // create the search result entry and display under the search
            let resultElement = document.createElement('div');
            resultElement.className="search-result";
            resultElement.innerHTML = result.name;
            resultElement.addEventListener('click', function(){
                map.flyTo([lat, lng], 16)
                marker.openPopup();
            })

            document.querySelector("#results").appendChild(resultElement);
        }
    })

    document.querySelector("#btnShowSearch").addEventListener('click', function(){
   
        let searchContainer = document.querySelector('#search-container');

        let isDisplayed =  searchContainer.style.display == 'block';
        console.log(isDisplayed);
        if (isDisplayed) {
            searchContainer.style.display = 'none';
        } else {
            searchContainer.style.display = 'block';
        }
    });
})

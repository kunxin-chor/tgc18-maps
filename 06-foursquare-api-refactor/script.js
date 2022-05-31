async function main() {

    let map = createMap(1.3521, 103.8198);

    window.addEventListener('DOMContentLoaded', async function () {
       
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
               showSearchResult(result, map);
            }
        })
    

        
        document.querySelector("#btnShowSearch").addEventListener('click', function(){
       
            let searchContainer = document.querySelector('#search-container');
    
            let isDisplayed =  searchContainer.style.display == 'block';
            if (isDisplayed) {
                searchContainer.style.display = 'none';
            } else {
                searchContainer.style.display = 'block';
            }
        });
    })
    
}
// explict main entry
main();
// const variables cannot reassign hence it's safer to use as globals
const BASE_API_URL = 'https://api.foursquare.com/v3/';
// by right API key not be supposed to be here. We'll see how to hide it 
// once we done server-side programming
const API_KEY = 'fsq3Ksfec1J6FlLH2iv9/3l6kT2wMY8O4Jtcii2/BShR62o=';

// async function search() {
// version 1: hard-coded
//     let url = BASE_API_URL + 'places/search';
//     let response = await axios.get(url,{
//         'params': {
//             'll': "1.3521,103.8198",
//             'query':'Chicken rice'
//         },
//         'headers':{
//             // the first letter must be upper case (due to the HTTP protocol)
//             'Accept': 'application/json',  // MIME type -- expect a JSON formatted data
//             'Authorization': API_KEY
//         }
//     });
//     console.log(response.data);
// }

async function search(lat, lng, query, radius) {

    let url = BASE_API_URL + 'places/search';
    let response = await axios.get(url,{
        'params': {
            'll': lat+","+lng,
            'query':query,
            'radius': radius,
            'limit': 50
        },
        'headers':{
            // the first letter must be upper case (due to the HTTP protocol)
            'Accept': 'application/json',  // MIME type -- expect a JSON formatted data
            'Authorization': API_KEY
        }

    });

    return response.data;
}
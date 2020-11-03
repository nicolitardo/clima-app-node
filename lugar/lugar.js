const axios = require('axios');
const https = require('https');



let ciudad = "Nueva York";

// const instance = axios.create({
//     baseURL: url,
//     // headers: { 'X-Custom-Header': 'foobar' }
// });

// instance.get()
//     .then(resp => {
//         console.log(resp.data);
//     })
//     .catch(err => {
//         console.log('Error!!! ', err);
//     });


const getLugarLatLng = async(dir) => {

    const encodeUrl = encodeURI(dir);

    let url = `https://geocode.xyz/Hauptstr.,+57632+"${ encodeUrl }"?json=1`;

    // At instance level
    const instance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    });
    instance.get(url);

    // At request level
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    const resp = await axios.get(url, { httpsAgent: agent });

    if (resp.status !== 200) {
        throw new Error(`No hay resultados para ${ dir }`);
    }

    // console.log(resp);

    const direccion = resp.data.standard.city + ', ' + resp.data.standard.countryname;
    const lat = resp.data.latt;
    const lng = resp.data.longt;

    return {
        direccion,
        lat,
        lng
    }
}

module.exports = {
    getLugarLatLng
}
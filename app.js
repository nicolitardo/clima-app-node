const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');
const { getClima } = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Descripcion de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

// console.log(argv.direccion);

// lugar.getLugarLatLng(argv.direccion)
//     .then(resp => console.log(resp));


const getInfo = async(direccion) => {
    try {

        const coords = await lugar.getLugarLatLng(direccion);
        const temp = await getClima(coords.lat, coords.lng);
        return `El clima de ${ coords.direccion } es de ${ temp }`;

    } catch (err) {
        return `No se pudo determinar el clima de ${ direccion }`;
    }

}

getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log);
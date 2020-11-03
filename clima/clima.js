const axios = require('axios');
const https = require('https');

const getClima = async(lat, lng) => {

    const apiKey = 'fbcacfe89caf965f8c88ad45fca597c8';
    const unit = 'metric';
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${ apiKey }&lat=${ lat }&lon=${ lng }&units=${ unit }`;
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

    return resp.data.main.temp;
};

module.exports = {
    getClima
}
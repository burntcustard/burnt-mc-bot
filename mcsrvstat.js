
const fetch = require("node-fetch");
const mcserver = require('./config.json').mcserver;

module.exports = () => {
    return fetch("https://api.mcsrvstat.us/1/" + mcserver)
    .then(status => status.json())
    .catch((error) => {
        console.log("Error getting server info for " + mcserver);
    });
};

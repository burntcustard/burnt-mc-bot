
const fs = require("fs");
const path = require('./config.json').mcpath + "server.properties";

exports.get = function () {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (err, props) => {
            if (err) {
                reject(err);
            } else {
                props = props.trim(); // Remove extra whitespace/newlines
                props = props.split(/\r?\n/); // Split into array, and...
                props = props.map(pair => pair.split("=")); // Key/values
                resolve(props);
            }
        });
    });
};

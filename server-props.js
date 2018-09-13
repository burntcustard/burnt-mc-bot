
const fs = require("fs");
const path = require('./config.json').mcpath + "server.properties";

/**
 * Returns an array of property-value arrays. E.g.
 * [[seed,1234567890], [difficulty,3]]
 */
function getArray() {
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
}

/**
 * Returns an object containing property-value pairs. If a propertyName is
 * specified, then the object returned will only only have that one property.
 * If the requested doesn't exist in server.properties, null will be returned.
 */
exports.get = function (propertyName) {

    return getArray()
        .then(propArray => {
            return Object.assign(...propArray.map(p => ({[p[0]]: p[1]})));
        })
        .then(propObj => {
            if (propertyName === undefined || propertyName === "all") {
                return propObj;
            }
            if (propObj[propertyName] === undefined) {
                return null;
            }
            return { [propertyName]: propObj[propertyName] };
        });

};

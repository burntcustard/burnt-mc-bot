
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

exports.get = function (propertyName) {

    let allProps = {};

    getArray().then(propArray => {
        propArray.forEach(prop => {
            allProps[prop[0]] = prop[1];
        });
    });

    // This isn't working because getArray().then(...) is async?
    console.log(allProps);

    if (propertyName === undefined) {
        return allProps;
    }

    if (allProps[propertyName] === undefined) {
        return null;
    }

    return { propertyName: allProps[propertyName] };

};

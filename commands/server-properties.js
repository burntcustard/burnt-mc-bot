
const BaseCommand = require('./base');
const fs = require("fs");

module.exports = class Command extends BaseCommand {

    constructor() {
        super();
        this.desc = "Viewing and modifying values in server.properties";
    }

    /**
     * Returns an array of property-value arrays. E.g.
     * [[seed,1234567890], [difficulty,3]]
     */
    getProperties() {
        return new Promise((resolve, reject) => {
            let path = this.config.mcpath + "server.properties";
            fs.readFile(path, "utf8", (err, props) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(props.split(/\r?\n/).map(pair => pair.split("=")));
                }
            });
        });
    }

    // What happens when the command is activated
    run(message, config) {

        // Args to the command are everything except the command itself
        let args = message.content.replace(config.prefix + this.name, '');

        // Split args into array at comma/space, & remove extra whitespace
        args = args.split(/[,\s]\s/).map(arg => arg.trim());

        console.log("!server-properties called with args: " + args);

        this.getProperties().then(propvals => {
            propvals.forEach(propval => {
                let prop = propval[0];
                let value = propval[1];
                if (prop === args[0] || args[0] === "all") {
                    message.channel.send(`${prop} = \`${value}\``);
                }
            });
        });

    }

};

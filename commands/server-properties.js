
const BaseCommand = require('./base');
const serverProps = require('./../server-props');

module.exports = class Command extends BaseCommand {

    constructor() {
        super();
        this.desc = "Viewing and modifying values in server.properties";
        this.help = "After \\`${this.config.prefix + this.name}\\` specify a server property to display, or \"all\" to show all.";
    }

    /**
     * Returns an array of property-value arrays. E.g.
     * [[seed,1234567890], [difficulty,3]]
     */
//    getProperties() {
//        return new Promise((resolve, reject) => {
//            let path = this.config.mcpath + "server.properties";
//            fs.readFile(path, "utf8", (err, props) => {
//                if (err) {
//                    reject(err);
//                } else {
//                    props = props.trim(); // Remove extra whitespace/newlines
//                    props = props.split(/\r?\n/); // Split into array, and...
//                    props = props.map(pair => pair.split("=")); // Key/values
//                    resolve(props);
//                }
//            });
//        });
//    }

    run(message, config) {

        let args = this.getArgs(message);

        if (!args || args[0] === "help") {
            this.showHelp(message);
            return;
        }

        serverProps.get().then(propvals => {
            propvals.forEach(propval => {
                let prop = propval[0];
                let value = propval[1];
                if (prop === args[0] || args[0] === "all") {
                    message.channel.send(`**${prop}**=\`${value}\``);
                }
            });
        });

    }

};

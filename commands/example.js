
const BaseCommand = require('./base');

module.exports = class Command extends BaseCommand {

    constructor() {
        super();
        this.desc = "An example command to test with";
        this.aliases = [
            ["!foo"],
            ["example", "command"],
            ["!ping"]
        ];
    }

    run(message) {
        message.channel.send("pong!");
    }

};

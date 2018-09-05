
const BaseCommand = require('./base');

module.exports = class Command extends BaseCommand {

    constructor() {

        // Call the base command constructor to inherit its methods
        super();

        // A description of this command that explains what it does
        this.desc = "An example command to test with";

        // Sets of keywords that must all appear in a message to active this
        this.aliases = [
            ["the", "example", "command"],
            ["alternative", "key", "words"]
        ];
    }

    // What happens when the command is activated
    run(message) {
        message.channel.send("pong!");
    }

};

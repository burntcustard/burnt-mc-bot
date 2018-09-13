
const BaseCommand = require('./base');
const serverProps = require('./../server-props');

module.exports = class Command extends BaseCommand {

    constructor() {
        super();
        this.desc = "Show the seed of the server map";
    }

    run(message, config) {
        serverProps.get("seed").then(props => {
            message.channel.send(`\`${props.seed}\``);
        });
    }

};


const BaseCommand = require('./base');
const serverProps = require('./../server-props');

module.exports = class Command extends BaseCommand {

    constructor() {
        super();
        this.desc = "View Minecraft server.properties";
        this.help = "After \\`${this.config.prefix + this.name}\\` specify " +
                    "a server property to display, or \"all\" to show all.";
        this.aliases = [
            "server-property"
        ];
    }

    run(message, config) {

        let args = this.getArgs(message);

        console.log("With args: ", args);

        if (!args || args[0] === "help") {
            this.showHelp(message);
            return;
        }

        serverProps.get(args[0]).then(props => {
            if (props === null) {
                message.channel.send("That server property doesn't exist!");
                return;
            }
            for (let prop in props) {
                message.channel.send(`**${prop}**=\`${props[prop]}\``);
            }
        });
    }

};

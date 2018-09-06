
const BaseCommand = require("./base");
const config = require("./../config.json");
const fs = require("fs");

module.exports = class Command extends BaseCommand {

    constructor() {
        super();
        this.roles = ["Admin"];
        this.desc = "Lets you change the prefix used to run commands";
        this.aliases = [
            ["change the prefix to"]
        ];
    }

    run(message) {
        config.prefix = message.content.substr(-1);
        fs.writeFile(
            "./../config.json",
            JSON.stringify(config), (err) => console.err
        );
        message.channel.send(`Command prefix set to: \`${config.prefix}\``);
    }

};

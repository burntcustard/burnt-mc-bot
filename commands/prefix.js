
const BaseCommand = require("./base");
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

    run(message, config) {

        let cmd = config.prefix + this.name;

        if (message.content.replace(/\s/g, '') === cmd) {
            message.channel.send(`Specify a new prefix after ${cmd}`);
            return true;
        }

        config.prefix = message.content.substr(-1);
        let jsonStr = JSON.stringify(config);
        let options = { flag: 'w' };
        fs.writeFile("./../config.json", jsonStr, options, (err) => {
            if (err) throw err;
            message.channel.send(`Command prefix set to: \`${config.prefix}\``);
        });
    }

};

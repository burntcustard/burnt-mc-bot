
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
            message.channel.send(`The prefix is currently set to ${config.prefix}`);
            message.channel.send(`Write a new prefix after ${cmd} to change it`);
            return true;
        }

        config.prefix = message.content.substr(-1);
        let jsonStr = JSON.stringify(config, null, 4); // 4 space indentation
        fs.writeFile("./config.json", jsonStr, (err) => {
            if (err) throw err;
            message.channel.send(`Command prefix set to: \`${config.prefix}\``);
        });
    }

};

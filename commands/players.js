
const BaseCommand = require('./base');
const fetch = require("node-fetch");

module.exports = class Command extends BaseCommand {

    constructor() {
        super();
        this.desc = "Players command";
        this.aliases = [
            ["!players"]
        ];
    }

    run(message) {
        return new Promise((resolve, reject) => {
            console.log("Running players command");
            fetch("https://api.mcsrvstat.us/1/mc.burnt.io")
            .then(status => status.json())
            .then(json => JSON.stringify(json.players.list))
            .then(players => message.channel.send(players))
            //.then(json => message.channel.send(json))
            .catch((error) => {
                console.log("Error getting server info");
            });
        });
    }

};

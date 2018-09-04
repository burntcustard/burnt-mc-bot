
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
            fetch("https://api.mcsrvstat.us/1/mc.burnt.io")
            .then(status => status.json())
            .then((json) => {
                let playerStr = "test";
                let players = json.players;
                if (json.offline) {
                    playerStr = "Server is offline!";
                } else
                if (players && !players.list) {
                    playerStr = "No one is playing :(";
                } else
                if (players && players.list.length > 0) {
                    playerStr = "Currently online: ";
                    playerStr += players.list.join(", ");
                }
                message.channel.send(playerStr);
                resolve(playerStr);
            })
            .catch((error) => {
                console.log("Error getting server info");
            });
        });
    }

};

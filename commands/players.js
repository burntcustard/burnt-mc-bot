
const BaseCommand = require('./base');
const getMCJSON = require("./../mcsrvstat");

module.exports = class Command extends BaseCommand {

    constructor() {
        super();
        this.desc = "Players command";
    }

    run(message) {
        return new Promise((resolve, reject) => {
            getMCJSON()
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
                console.log("Error handling server info");
            });
        });
    }

};

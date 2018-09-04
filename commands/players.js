const BaseCommand = require('./base');
const config = require("../config.json");
const Discord = require("discord.js");
const getMCJSON = require("./../mcsrvstat");

module.exports = class Command extends BaseCommand {

    constructor() {
        super();
        this.desc = "Players command";
    }

    /**
     * @param {Discord.Message} message 
     */
    run(message) {
        const guild = message.guild;

        return new Promise((resolve, reject) => {
            getMCJSON()
            .then((json) => {
                let playerStr = "";
                let players = json.players;
                if (json.offline) {
                    playerStr = "Server is offline!";
                } else
                if (players && !players.list) {
                    playerStr = "No one is playing :(";
                } else
                if (players && players.list.length > 0) {
                    // Used if the emoji needs to be created (cannot use straight away)
                    const steve_emoji = guild.emojis.find(e => e.name == "steve");

                    players.list.forEach((player, i, a) => {
                        let emoji = guild.emojis.find(e => e.name == player);
                        
                        if (!emoji) {
                            guild.createEmoji(`https://minotar.net/helm/${player}`, player)
                                .then(e => {
                                    emoji = e;
                                    console.log(`Emoji :${emoji.name}: created`);
                                }).catch(console.error);
                        } else {
                            console.log(`Emoji :${emoji.name}: already exists`);
                        }

                        a[i] = `    ${emoji ? emoji : steve_emoji} \`${a[i]}\``
                    });

                    playerStr = `**Currently playing on ${config.mcserver}:**\n\n`;
                    playerStr += players.list.join("\n\n");
                }
                message.channel.send(playerStr);
                resolve(playerStr);
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

};

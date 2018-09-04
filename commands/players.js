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
     * Add emoji player heads and format the player list
     */
    formatPlayers(playerList, guild, steve_emoji) {
        playerList.forEach((player, i, a) => {
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
            a[i] = `${emoji ? emoji : steve_emoji} \`${a[i]}\``;
            if (i !== playerList.length - 1) {
                a[i] = `┣  ${a[i]}`;
            } else {
                a[i] = `┗  ${a[i]}`;
            }

        });
        return playerList;
    }

    /**
     * @param {Discord.Message} message
     */
    run(message) {
        const guild = message.guild;

        return new Promise((resolve, reject) => {
            getMCJSON()
            .then((json) => {
                let players = json.players;
                if (json.offline) {
                    message.channel.send("Server is offline!");
                } else
                if (players && !players.list) {
                    message.channel.send("No one is playing :(");
                } else
                if (players && players.list.length > 0) {
                    // Used if the emoji needs to be created (cannot use straight away)
                    const steve_emoji = guild.emojis.find(e => e.name == "steve");

                    players.list = this.formatPlayers(players.list, guild, steve_emoji);

                    message.channel.send(`**Currently playing on ${config.mcserver}:**`);

                    players.list.forEach(player => {
                        message.channel.send(player);
                    });
                }
                resolve(true);
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

};

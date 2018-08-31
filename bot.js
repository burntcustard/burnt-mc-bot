const Discord = require("discord.js");
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config.json');

//const command = require('./command.js');
const commands = require('require-all')(__dirname + '/commands');

for (var command in commands) {
    console.log("Loaded command: " + command);
}

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {
    //if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    Object.keys(commands).forEach(key => {
        let command = commands[key];
        let aliasFound = false;
        command.aliases.forEach(aliasSet => {
            let wordFound = true;
            aliasSet.forEach(word => {
                if (!message.content.includes(word)) {
                    wordFound = false;
                } else {
                    console.log(message.content + " includes " + word);
                }
            });
            if (wordFound) {
                console.log("All the words in an alias set were found!");
                aliasFound = true;
            }
        });
        if (aliasFound) {
            message.channel.send(command.run());
        }
    });

});

client.login(config.token);

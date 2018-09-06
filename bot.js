#!/usr/bin/env node

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

console.log("Loading Commands:");

var commands = require("require-all")({
  dirname     :  __dirname + "/commands",
  filter      :  /(.+)\.js$/,
  resolve     : (Command) => {
      return new Command();
  }
});

// Remove base command from the list cos we don't want to use it
delete(commands.base);

for (var commandKey in commands) {
    let command = commands[commandKey];
    command.name = commandKey;
    command.aliases.push([config.prefix + command.name]);
    console.log(command.name);
}

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {

    // Don't let the bot respond to it's own messages
    if (message.author.bot) return;

    Object.keys(commands).forEach(key => {
        let command = commands[key];
        command.activatedBy(message).then((activated) => {
            if (activated || message.content === config.prefix + command.name) {
                if (command.isAdminIfRequired(client, message, config)) {
                    console.log(key + " command activated");
                    command.run(message, config);
                } else {
                    console.log("Needed to be admin but apparently isn't...");
                    console.log("OwnerID: " + config.ownerID);
                    console.log("Messager user name: " + message.author.username);
                    console.log("Messager user tag : " + message.author.tag);
                    console.log("Messager user ID  : " + message.author.id);
                }
            }
        });
    });

});

client.login(config.token);

const Discord = require("discord.js");
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config.json');

var commands = require('require-all')({
  dirname     :  __dirname + '/commands',
  filter      :  /(.+)\.js$/,
  resolve     : function (fn) {
    return fn();
  }
});

console.log("Loading Commands:");
for (var commandKey in commands) {
    let command = commands[commandKey];
    command.name = commandKey;
    command.prototype = commands.base;
    console.log("  " + commandKey);
}

// Remove base command from the list cos we don't want to use it
delete(commands.base);

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {

    // Don't let the bot respond to it's own messages
    if (message.author.bot) return;

    Object.keys(commands).forEach(key => {
        let command = commands[key];
        command.activatedBy(message).then((activated) => {
            if (activated) {
                command.run(message);
            }
        });
    });

});

client.login(config.token);

const Discord = require("discord.js");
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config.json');

var commands = require('require-all')({
  dirname     :  __dirname + '/commands',
  filter      :  /(.+)\.js$/,
  resolve     : (Command) => {
      return new Command();
  }
});

console.log("Loading Commands:");
for (var commandKey in commands) {
    let command = commands[commandKey];
    command.name = commandKey;
    if (commandKey !== "base") {
        //command.prototype = commands.base;
        //Object.setPrototypeOf(command, commands.base);
        //command = Object.assign(commands.base.activatedBy, command);
    }
    //console.log("  " + commandKey + " with proto of " + JSON.stringify(command.prototype));
}

// Remove base command from the list cos we don't want to use it
delete(commands.base);

for (var commandKey in commands) {
    let command = commands[commandKey];
    //console.log((command));
    command.test();
}

//const Example = require('./commands/example.js');
//var example = new Example();
//console.log(example);
//example.name = "example";
//example.test();

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
                console.log(key + " command activated");
                command.run(message);
            }
        });
    });

});

client.login(config.token);

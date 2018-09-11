
module.exports = class Command {

    constructor() {
        this.name = ""; // Set in bot.js
        this.config = ""; // Set in bot.js
        this.desc = "No description for this command";
        this.help = "No help documented for this command";
        this.aliases = []; // No aliases (yet) so can only be called with !name
    }

    test() {
        console.log("This message is from " + this.name);
    }

    activatedBy(message, config) {
        return new Promise((resolve, reject) => {
            if (message.content === config.prefix + this.name) {
                resolve(true);
            }
            this.aliases.forEach(phrase => {
                let wordFound = true;
                phrase.forEach(word => {
                    if (!message.content.toLowerCase().includes(word)) {
                        wordFound = false;
                    }
                });
                if (wordFound) {
                    resolve(true);
                }
            });
            resolve(false);
        });
    }

    isRoleIfRequired(client, message, config) {
        if (this.roles) {
            // Check if the message sender has one of the required roles
            if (message.member.roles.some(r => this.roles.includes(r.name))) {
                return true;
            } else {
                let roles = this.roles.join('s, ') + 's',
                    command = config.prefix + this.name,
                    rule = `Only ${roles} can run the ${command} command!`;
                message.channel.send(rule);
                return;
            }
        } else {
            return true;
        }
    }

    getArgs(message) {
        // Args to the command are everything except the command itself
        let args = message.content.replace(this.config.prefix + this.name, '');
        // Return args split into array at comma/space, & w/ no whitespace
        return args.split(/[,\s]\s/).map(arg => arg.trim());
    }

    showHelp(message) {
        message.channel.send(this.help);
    }

};

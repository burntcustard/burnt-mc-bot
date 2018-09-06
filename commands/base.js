
module.exports = class Command {

    constructor() {
        this.desc = "Inherit from this command";
        this.aliases = [];
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

    isAdminIfRequired(client, message, config) {
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
};

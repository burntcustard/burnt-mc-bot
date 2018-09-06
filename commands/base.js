
module.exports = class Command {

    constructor() {
        this.desc = "Inherit from this command";
        this.aliases = [];
    }

    test() {
        console.log("This message is from " + this.name);
    }

    activatedBy(message) {
        return new Promise((resolve, reject) => {
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
        if (this.admin) {
            if (message.author.id === config.ownerID) {
                return true;
            } else {
                let say = message.channel.send,
                    owner = config.ownerID.split("#")[0],
                    command = config.prefix + this.name;
                message.channel.send(`Only ${owner} can run the ${command} command!`);
                return;
            }
        } else {
            return true;
        }
    }
};

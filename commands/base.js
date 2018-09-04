
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

};

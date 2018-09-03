
module.exports = function () {

    this.desc = "Inherit from this(?)";

    this.test = () => {
        console.log("This message is from " + this.name);
    };

    this.activatedBy = message => new Promise((resolve, reject) => {
        this.aliases.forEach(phrase => {
            let wordFound = true;
            phrase.forEach(word => {
                if (!message.content.includes(word)) {
                    wordFound = false;
                }
            });
            if (wordFound) {
                resolve();
            }
        });
        reject("Phrase not found in aliases");
    });

    return this;
};

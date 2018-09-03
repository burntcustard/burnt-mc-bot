
module.exports = function () {

    this.desc = "An example command to test with";

    this.aliases = [
        ["!foo"],
        ["example", "command"],
        ["!ping"]
    ];

    this.run = (message) => {
        message.channel.send("pong!");
    };

    return this;
};

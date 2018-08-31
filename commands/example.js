
module.exports = {

    desc: "An example command to test with",
    aliases: [
        ["foo"],
        ["example", "command"],
        ["!ping"]
    ],

    run: () => {
        console.log("Trying to send message");
        return "pong!";
    }

};

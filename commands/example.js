
// Just figuring out what each command needs to have


this.name = "ping";
this.aliases = [
    ["foo"],
    ["example", "command"]
];
this.desc = "An example command to test with";
this.run = () => {
    message.channel.send("pong!");
};

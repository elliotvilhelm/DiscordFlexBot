const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const bot_id = "<@704922578694701107>"
const channel_id = "<#704795505506385981>"


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    var member_map = {};
    if (msg.channel.toString() == channel_id) {
        if (msg.content === 'sum') {
            msg.delete({ timeout: 1000 }).catch(error => { console.error(error); });
            msg.channel.messages.fetch()
                .then(messages => {
                    messages.map(m => {
                        var author = m.author.toString();
                        if (author == bot_id) return;

                        if (!(author in member_map) && author != bot_id) {
                            member_map[author] = 0;
                        }

                        const message = m.toString();
                        const matches = message.match(/(\d+)/);
                        if (matches != null) {
                            var result = parseInt(matches[0]);
                            if (!isNaN(result)) {
                                member_map[author] += result;
                            }
                        }
                    })
                    Object.keys(member_map).map(function(key, index) {
                        if (!(isNaN(member_map[key]))) {
                            msg.channel.send(`member: ${key} value: ${member_map[key]}`);
                        }
                    });
                }).catch(error => {
                    console.error("Error:", error);
                });
        }
    }
});

client.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.login(config.token);

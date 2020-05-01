const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const bot_id = "<@704922578694701107>"
const channel_id = "<#704795505506385981>"
const start_date = "04/28/2020"


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    msg.channel.messages.fetch()
        .then(messages => {
            if (msg.content == 'sum') {
                messages.map(m => {
                    var author = m.author.toString();
                    if (author == bot_id || m.content == 'sum') {
                        m.delete({ timeout: 1000 }).catch(error => { console.error(error); });
                    }
                });
            }
        }).then(() => {
            var member_map = {};
            msg.channel.messages.fetch().then(messages => {
                if (msg.channel.toString() == channel_id) {
                    // SUM COMMAND
                    if (msg.content === 'sum') {
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
                        var items = Object.keys(member_map).map(function(key) {
                            return [key, member_map[key]];
                        });
                        items.sort(function(first, second) {
                            return second[1] - first[1];
                        });

                        var i = 1;
                        var s = "Flex Ranking\n";
                        items.map(item => {
                            s += `${i}. Member: ${item[0]} Score: ${item[1]}\n`
                            i += 1;
                        });
                        msg.channel.send(s);
                    }
                }
            })
                .catch(error => {
                    console.error("Error:", error);
                })
        }).catch(error => {
            console.error("Error:", error);
        });
});

client.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.login(config.token);

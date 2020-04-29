const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const bot_id = "<@704922578694701107>"
const channel_id = "<#704795505506385981>"


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.channel.toString() == channel_id) {
    if (msg.content === 'sum') {
      msg.channel.messages.fetch()
        .then(messages => {
          const member_map = {};
          messages.map(m => {
            var author = m.author.toString();
            if (author == bot_id) return;
            if (!(author in member_map)) {
              member_map[author] = 0;
            }
            const message = m.toString();
            const matches = message.match(/(\d+)/);
            if (matches != null) {
              member_map[author] += parseInt(matches[0]);
            }
          })
          Object.keys(member_map).map(function(key, index) {
            msg.channel.send(`member: ${key} value: ${member_map[key]}`);
          });
        });
    }
  }
});

client.login(config.token);

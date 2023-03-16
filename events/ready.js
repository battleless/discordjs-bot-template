const { Events } = require('discord.js');

module.exports = {
    data: {
        name: Events.ClientReady,
        once: true
    },
    async run(bot) {
        console.log(`${bot.user.tag} is ready!`);
    }
};
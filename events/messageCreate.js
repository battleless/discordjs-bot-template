const { Events } = require('discord.js');
const config = require('../config.json');

module.exports = {
    data: {
        name: Events.MessageCreate,
        once: false
    },
    async run(message, commands) {
        if (!message.content.startsWith(config.prefix) || message.author.bot) return;

        const commandName = message.content.replace(config.prefix, '').split(' ')[0];
        const command = commands.get(commandName);
    
        if (!command) return;
    
        try {
            command.run(message);
        } catch (error) {
            console.error(error);
            message.edit({ 
                content:`There was an error trying to execute this command!\n${error.name}: ${error.message}`
            });
        };
    }
};
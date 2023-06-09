const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');

const config = require('./config.json');

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commands = new Map();

for (const commandPath of commandFiles) {
    const command = require(`./commands/${commandPath}`);
    if (!command.data) return console.log(`Command (${commandPath}) is missing data property!`);

    commands.set(command.data.name, command);
};

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const eventPath of eventFiles) {
	const event = require(`./events/${eventPath}`);
	if (!event.data) return console.log(`Event (${eventPath}) is missing data property!`);

	if (event.data.once === true) {
        if (event.data.name === 'messageCreate') {
            bot.once(event.data.name, (...args) => event.run(...args, commands));
        } else bot.once(event.data.name, (...args) => event.run(...args));
    } else if (event.data.once === false) {
        if (event.data.name === 'messageCreate') {
            bot.on(event.data.name, (...args) => event.run(...args, commands));
        } else bot.on(event.data.name, (...args) => event.run(...args));
    };
};

bot.login(config.token);
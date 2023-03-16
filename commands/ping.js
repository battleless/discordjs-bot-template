module.exports = {
    data: {
        name: 'ping',
        description: 'Pong!',
        category: 'misc'
    },
    async run(message) {
        message.reply('Pong!');
    }
};
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', () => {
  console.log('1WOTD bot ready');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot && message.author.id !== client.user.id) { // Ensure the message is from another bot
    const botId = message.author.id;
    const channel = message.channel;
    
    try {
      const messages = await channel.messages.fetch({ limit: 10 }); // Fetch the last 10 messages in the channel
      const botMessages = messages.filter(m => m.author.id === botId && m.id !== message.id); // Filter out the current message
      
      for (const [id, msg] of botMessages) {
        await msg.delete();
      }
    } catch (error) {
      console.error('Error fetching or deleting messages:', error);
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

module.exports = client;

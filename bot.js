const Discord = require('discord.js');
const config = require('./config.json');
const commands = require('./commands');

// Create a new Discord client
const client = new Discord.Client();

// Log in to Discord with the bot's token
client.login(config.token);

// When the bot is ready, log a message to the console and set the activity status
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity('with code');
});

// Listen for messages and execute commands
client.on('message', async message => {
  // Ignore messages sent by the bot and messages that don't start with the command prefix
  if (message.author.bot || !message.content.startsWith(config.prefix)) return;

  // Remove the command prefix and split the message into arguments
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Check if the command exists
  if (!commands[commandName]) return;

  try {
    // Execute the command
    await commands[commandName](message, args);
  } catch (error) {
    console.error(error);
    message.reply('An error occurred while executing the command.');
  }
});

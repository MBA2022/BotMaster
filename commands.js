const { createCanvas, loadImage } = require('canvas');

module.exports = {
  async ping(message, args) {
    // Reply with "Pong!"
    message.reply('Pong!');
  },

  async say(message, args) {
    // Reply with the message content
    message.channel.send(args.join(' '));
  },

  async image(message, args) {
    // Load an image from a URL and send it back to the channel
    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext('2d');
    const image = await loadImage(args[0]);
    ctx.drawImage(image, 0, 0, 500, 500);
    message.channel.send({ files: [canvas.toBuffer()] });
  }
};


module.exports = {
    kick: (message, args) => {
      // Check if user has permission to kick members
      if (!message.member.hasPermission('KICK_MEMBERS')) {
        return message.reply('You do not have permission to use this command!');
      }
  
      // Check if a member was mentioned
      if (!args.length) {
        return message.reply('Please mention a user to kick!');
      }
  
      // Get the mentioned user
      const member = message.mentions.members.first();
  
      // Kick the user
      member.kick().then(() => {
        message.reply(`${member.user.tag} was kicked from the server!`);
      }).catch(error => {
        message.reply(`Failed to kick ${member.user.tag}!`);
        console.error(error);
      });
    },
    
    ban: (message, args) => {
      // Check if user has permission to ban members
      if (!message.member.hasPermission('BAN_MEMBERS')) {
        return message.reply('You do not have permission to use this command!');
      }
  
      // Check if a member was mentioned
      if (!args.length) {
        return message.reply('Please mention a user to ban!');
      }
  
      // Get the mentioned user
      const member = message.mentions.members.first();
  
      // Ban the user
      member.ban().then(() => {
        message.reply(`${member.user.tag} was banned from the server!`);
      }).catch(error => {
        message.reply(`Failed to ban ${member.user.tag}!`);
        console.error(error);
      });
    },
    
    unban: (message, args) => {
      // Check if user has permission to ban members
      if (!message.member.hasPermission('BAN_MEMBERS')) {
        return message.reply('You do not have permission to use this command!');
      }
  
      // Check if an ID was provided
      if (!args.length) {
        return message.reply('Please provide a user ID to unban!');
      }
  
      // Get the banned users
      message.guild.fetchBans().then(bans => {
        // Find the banned user with the provided ID
        const user = bans.find(ban => ban.user.id === args[0]);
  
        // Check if the user was found
        if (!user) {
          return message.reply('User not found!');
        }
  
        // Unban the user
        message.guild.members.unban(user.user).then(() => {
          message.reply(`${user.user.tag} was unbanned from the server!`);
        }).catch(error => {
          message.reply(`Failed to unban ${user.user.tag}!`);
          console.error(error);
        });
      });
    },
  
    mute: (message, args) => {
      // Check if user has permission to manage roles
      if (!message.member.hasPermission('MANAGE_ROLES')) {
        return message.reply('You do not have permission to use this command!');
      }
  
      // Check if a member was mentioned
      if (!args.length) {
        return message.reply('Please mention a user to mute!');
      }
  
      // Get the mentioned user
      const member = message.mentions.members.first();
  
      // Check if user is already muted
      if (member.roles.cache.some(role => role.name === 'Muted')) {
        return message.reply('This user is already muted!');
      }
  
      // Get the muted role
      const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
  
      // Mute the user
      member.roles.add(mutedRole).then(() => {
        message.reply(`${member.user.tag} was muted!`);
      }).catch(error => {
        // Handle error if unable to add muted role to user
        message.reply(`Failed to mute ${member.user.tag}!`);
        console.error(error);
        });
    },
    unmute: (message, args) => {
        // Check if user has permission to manage roles
        if (!message.member.hasPermission('MANAGE_ROLES')) {
          return message.reply('You do not have permission to use this command!');
        }
      
        // Check if a member was mentioned
        if (!args.length) {
          return message.reply('Please mention a user to unmute!');
        }
      
        // Get the mentioned user
        const member = message.mentions.members.first();
      
        // Check if user is already unmuted
        if (!member.roles.cache.some(role => role.name === 'Muted')) {
          return message.reply('This user is not muted!');
        }
      
        // Get the muted role
        const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
      
        // Unmute the user
        member.roles.remove(mutedRole).then(() => {
          message.reply(`${member.user.tag} was unmuted!`);
        }).catch(error => {
          // Handle error if unable to remove muted role from user
          message.reply(`Failed to unmute ${member.user.tag}!`);
          console.error(error);
        });
      },
      
    clear: (message, args) => {
        // Check if user has permission to manage messages
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
          return message.reply('You do not have permission to use this command!');
        }
      
        // Check if a number of messages to clear was provided
        if (!args.length) {
          return message.reply('Please provide a number of messages to clear!');
        }
      
        // Convert the argument to a number
        const num = parseInt(args[0]);
      
        // Check if argument is a valid number
        if (isNaN(num)) {
          return message.reply('Please provide a valid number!');
        }
      
        // Check if the number is within the valid range
        if (num < 1 || num > 100) {
          return message.reply('Please provide a number between 1 and 100!');
        }
      
        // Clear the messages
        message.channel.bulkDelete(num + 1).then(() => {
          message.reply(`Deleted ${num} messages!`).then(msg => {
            // Delete the reply message after a delay of 5 seconds
            msg.delete({ timeout: 5000 });
          });
        }).catch(error => {
          // Handle error if unable to clear messages
          message.reply('Failed to clear messages!');
          console.error(error);
        });
    },
    // Warn a user
    warn: (message, args) => {
        // Check if user has permission to manage roles
        if (!message.member.hasPermission('MANAGE_ROLES')) {
          return message.reply('You do not have permission to use this command!');
        }
    
        // Check if a member was mentioned
        if (!args.length) {
          return message.reply('Please mention a user to warn!');
        }
    
        // Get the mentioned user
        const member = message.mentions.members.first();
    
        // Send a warning message to the user
        member.send(`You have been warned in ${message.guild.name}!`).then(() => {
          message.reply(`Warning sent to ${member.user.tag}!`);
        }).catch(error => {
          message.reply(`Failed to send warning to ${member.user.tag}!`);
          console.error(error);
        });
    },
      
    // Get a user's warnings
    warnings: (message, args) => {
        // Check if user has permission to manage roles
        if (!message.member.hasPermission('MANAGE_ROLES')) {
          return message.reply('You do not have permission to use this command!');
        }
    
        // Check if a member was mentioned
        if (!args.length) {
          return message.reply('Please mention a user to get their warnings!');
        }
    
        // Get the mentioned user
        const member = message.mentions.members.first();
    
        // TODO: Fetch and display the user's warnings
        message.reply(`Showing warnings for ${member.user.tag}...`);

    },

    // Temporarily mute a user
    tempmute: (message, args) => {
        // Check if user has permission to manage roles
        if (!message.member.hasPermission('MANAGE_ROLES')) {
          return message.reply('You do not have permission to use this command!');
        }
    
        // Check if a member was mentioned
        if (!args.length) {
          return message.reply('Please mention a user to temporarily mute!');
        }
    
        // Get the mentioned user
        const member = message.mentions.members.first();
    
        // Check if user is already muted
        if (member.roles.cache.some(role => role.name === 'Muted')) {
          return message.reply('This user is already muted!');
        }
    
        // Get the muted role
        const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    
        // Mute the user for a specified amount of time (in seconds)
        const muteTime = parseInt(args[1]);
        member.roles.add(mutedRole).then(() => {
          message.reply(`${member.user.tag} was muted for ${muteTime} seconds!`);
    
          // Set a timeout to automatically unmute the user after the specified time
          setTimeout(() => {
            member.roles.remove(mutedRole).then(() => {
              message.channel.send(`${member.user.tag} has been unmuted!`);
            }).catch(error => {
              console.error(error);
            });
          }, muteTime * 1000);
        }).catch(error => {
          message.reply(`Failed to mute ${member.user.tag}!`);
          console.error(error);
        });
    },
    tempban: (message, args) => {
        // Check if user has permission to ban members
        if (!message.member.hasPermission('BAN_MEMBERS')) {
          return message.reply('You do not have permission to use this command!');
        }
      
        // Check if a member was mentioned
        if (!args.length) {
          return message.reply('Please mention a user to ban!');
        }
      
        // Get the mentioned user
        const member = message.mentions.members.first();
      
        // Check if user can be banned
        if (!member.bannable) {
          return message.reply('Cannot ban this user!');
        }
      
        // Get ban duration
        const duration = parseInt(args[1]);
        if (isNaN(duration)) {
          return message.reply('Please provide a valid ban duration!');
        }
      
        // Get ban reason
        const reason = args.slice(2).join(' ');
      
        // Ban the user
        member.ban({ reason: reason }).then(() => {
          message.reply(`${member.user.tag} was banned for ${duration} days!`);
      
          // Schedule unban
          const unbanDate = new Date(Date.now() + duration * 24 * 60 * 60 * 1000);
          const job = schedule.scheduleJob(unbanDate, function() {
            message.guild.members.unban(member.user.id).then(() => {
              message.channel.send(`${member.user.tag} was unbanned!`);
            }).catch(error => {
              console.error(error);
            });
          });
      
          // Store ban data
          const data = {
            user: member.user.id,
            guild: message.guild.id,
            expiration: unbanDate.getTime(),
            job: job
          };
          tempBans.push(data);
        }).catch(error => {
          message.reply(`Failed to ban ${member.user.tag}!`);
          console.error(error);
        });
    },
      
    purge: (message, args) => {
        // Check if user has permission to manage messages
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
          return message.reply('You do not have permission to use this command!');
        }
      
        // Check if number of messages to delete was provided
        if (!args.length) {
          return message.reply('Please provide the number of messages to delete!');
        }
      
        // Parse number of messages to delete
        const numToDelete = parseInt(args[0]);
        if (isNaN(numToDelete)) {
          return message.reply('Please provide a valid number of messages to delete!');
        }
      
        // Check if number of messages to delete is within limit
        if (numToDelete < 1 || numToDelete > 100) {
          return message.reply('Please provide a number of messages to delete between 1 and 100!');
        }
      
        // Delete messages
        message.channel.bulkDelete(numToDelete).then(messages => {
          message.reply(`Deleted ${messages.size} messages!`);
        }).catch(error => {
          message.reply('Failed to delete messages!');
          console.error(error);
        });
    }
}        
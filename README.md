
# BotMaster
BotMaster is a simple Discord bot that can perform various moderation commands.
## Deployment
The required libraries in this code are:

**discord.js**: This library is used to interact with the Discord API and build Discord bots.

To install this library, you can use the following command in the command prompt/terminal:
```
npm install discord.js
```


## Installation
1. Clone the repository.
2. Install the dependencies with `npm install`.
3. Add Discord bot token in Configration file  `config.json`.

For example:

```
{
    "token": "YOUR_DISCORD_BOT_TOKEN",
    "prefix": "!"
}
```

## Usage
The following commands are available:
- **ping**: Reply with "Pong!"
- **say [message]**: Reply with the given message.
- **image [url]**: Load an image from a URL and send it back to the channel.
- **kick [user]**: Kick the mentioned user from the server.
- **ban [user]**: Ban the mentioned user from the server.
- **unban [user ID]**: Unban the user with the provided ID.
- **mute [user]**: Mute the mentioned user.
- **unmute [user]**: Unmute the mentioned user.
- **clear** - Allows moderators to delete a specified number of messages from a channel.
- **warn** - Allows moderators to issue a warning to a user.
- **warnings** - Allows users to see their own warnings or moderators to see the warnings of a specified user.
- **tempmute** - Allows moderators to temporarily mute a user in the server for a specified amount of time.
- **tempban** - Allows moderators to temporarily ban a user from the server for a specified amount of time.
- **purge** - Allows moderators to delete all messages from a specified user.
## Contributing

Contributions are always welcome! If you find a bug or have an idea for a new feature
please open an [issue](https://github.com/MBA2022/BotMaster/issues) or submit a [pull request](https://github.com/MBA2022/BotMaster/pulls).

## License

This project is licensed under the [MIT License.]([https://choosealicense.com/licenses/mit/](https://github.com/MBA2022/BotMaster/blob/main/License))
> All rights reserved © 2023 MBA {//}

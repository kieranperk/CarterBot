<a href="https://www.carterapi.com"><img src="https://151297354-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FciRkFwFdI6llRRifmbqJ%2Fuploads%2FrWJk4wUxapMwAgqOV3Np%2FBUILT-WITH-CARTER.svg?alt=media&token=32f7a446-b9b8-4ded-9263-1c11158c9c2f" style="width: 200px;" /></a>

# CarterBot
This is a project which intergrates www.carterapi.com into a discord bot. It utilizes the discord.js framework with Carter API to provide a realtime conversation through a users DM!

## Getting started:
To self-host the bot, first download the repository and extract it to a directory.

Then, making sure you have node.js installed, run the following command to install all the node modules:
```
npm i
```
After the modules have been installed, head to the config.json.example file and fill out the values.

Finally, run the bot by executing the start.bat file.

### Inviting the bot to your server:
Firstly, you will need to create your bot in the [Discord Developer Portal](https://discord.com/developers/applications/). Click New Application, provide the name of your bot, and then click create.

Then, on the left, you will see a new bot tab. Enter that and create a new bot.
**MAKE SURE TO TURN ON THE "MESSAGE CONTENT INTENT" OPTION OR ELSE THE BOT WILL NOT FUNCTION**

Finally, go to OAuth2 > Url Generator tab and select the 'bot' and 'applications.commands' scopes. This should generate a url below which you can use to invite the bot to your server!

## Features:
This project allows for:
- Real time user conversations in DMS
- Message downvoting
- Slash commands

## Known Issues:

```MESSAGE SPAM ERROR```
- If you send two messages at once to the bot, it will crash. (Working on a fix)

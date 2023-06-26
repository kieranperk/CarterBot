const config = require('../config.json');
const { carter } = require('../index.js');

module.exports = {
	name: 'messageCreate',
	async execute(message) {	
		if(message.author.id === config.clientId) return; // Returns if message is itself
		if(message.channel.isDMBased() || config.channelmode.toLowerCase() === "on" && message.channel.id === config.channelid) { // Checks if the message comes from a DM, or if (when the config is on) it came from a specific channel
			try {
				await message.channel.sendTyping();
				const content = message.content.trim(); // Remove leading/trailing whitespace
				if (content.length > 0) {
					const interaction = await carter.say(content, message.author.id);
					if (interaction.ok) {
						const reply_message = interaction.outputText
						message.reply({ content: `${reply_message}`, allowedMentions: { repliedUser: false } });
					}
				}
			} catch (error) { 
				console.log(error); 
			}
		} else { return;}
	},
};
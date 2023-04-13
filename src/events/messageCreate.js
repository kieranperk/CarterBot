const Carter = require("carter-js")
const config = require('../config.json');

module.exports = {
	name: 'messageCreate',
	async execute(message) {	
		if(message.author.id === config.clientId) return; // Returns if message is itself
		if(message.channel.isDMBased() || config.channelmode.toLowerCase() === "on" && message.channel.id === config.channelid) { // Checks if the message comes from a DM, or if (when the config is on) it came from a specific channel
			try {
				await message.channel.sendTyping()
				const carter = new Carter(config.carterkey)
				const interaction = await carter.say(await message.content, message.author.id)
  				const reply_message = interaction.data.output.text
				message.reply({ content: `${reply_message}`, allowedMentions: { repliedUser: false } })
			} catch(error) { console.log(error) }
		} else { return;}
	},
};
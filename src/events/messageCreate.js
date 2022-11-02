const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const { Carter } = require('carter-js');
const config = require('../config.json');

module.exports = {
	name: 'messageCreate',
	async execute(message) {	
		if(message.author.id === config.clientId) return; // Returns if message is itself

		if(message.channel.isDMBased() || config.channelmode === "on" && message.channel.id === config.channelid) { // Checks if the message comes from a DM, or if (when the config is on) it came from a specific channel
			try {
				await message.channel.sendTyping()

				const usermsg = await message.content // Defines the provided message query
				const carter = new Carter(config.carterkey)
				const response = await carter.say(usermsg)
				const reply_message = response.data.output.text

				const row1 = new ActionRowBuilder() // Downvote button builder
				.addComponents(
					new ButtonBuilder()
						.setCustomId('message_downvote')
						.setLabel('Downvote')
						.setEmoji('⬇️')
						.setStyle(ButtonStyle.Secondary),
				);
				
				const msg = await message.channel.send({ content: `${reply_message}`, components: [row1] }) // Sends response to channel

				const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });
				collector.on('collect', async i => {
					await carter.downvote(response)

				const row1 = new ActionRowBuilder() // Downvote button builder
					.addComponents(
						new ButtonBuilder()
						.setCustomId('message_downvote')
						.setLabel('Downvote')
						.setEmoji('⬇️')
						.setStyle(ButtonStyle.Secondary)
						.setDisabled(true),
					);	
					await i.update({ content: `\`DOWNVOTED\` || ${reply_message}`, components: [row1] });
				});

				await collector.on('end', collected => {
					msg.edit({ components: [] });
				});

			} catch(error) {
				console.log(error)
			}
		} else {
			return;
		}
	},
};
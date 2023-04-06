const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const { Carter } = require('carter-js');
const config = require('../config.json');

module.exports = {
	name: 'messageCreate',
	async execute(message) {	
		if(message.author.id === config.clientId) return; // Returns if message is itself

		if(message.channel.isDMBased() || config.channelmode.toLowerCase() === "on" && message.channel.id === config.channelid) { // Checks if the message comes from a DM, or if (when the config is on) it came from a specific channel
			try {
				await message.channel.sendTyping()

				const data = {
					text: await message.content,
					key: config.carterkey,
					playerId: message.author.id
				};

				fetch('https://api.carterlabs.ai/chat', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}).then(response => response.json()).then(async data => {
					const reply_message = data.output.text

					// const row1 = new ActionRowBuilder() // Downvote button builder
					// .addComponents(
					// 	new ButtonBuilder()
					// 		.setCustomId('message_downvote')
					// 		.setLabel('Downvote')
					// 		.setEmoji('⬇️')
					// 		.setStyle(ButtonStyle.Secondary),
					// );
					
					const msg = await message.reply({ content: `${reply_message}`, allowedMentions: { repliedUser: false } }) // components: [row1],
					
					// ======================= //
					// MESSAGE DOWNVOTE SYSTEM //
					// ======================= //

					// const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });
					// collector.on('collect', async i => {
					// 	await term.yellow("RESPONSE DOWNVOTED")

					// const row1 = new ActionRowBuilder() // Downvote button builder
					// 	.addComponents(
					// 		new ButtonBuilder()
					// 		.setCustomId('message_downvote')
					// 		.setLabel('Downvote')
					// 		.setEmoji('⬇️')
					// 		.setStyle(ButtonStyle.Secondary)
					// 		.setDisabled(true),
					// 	);	
					// 	await i.update({ content: `\`DOWNVOTED\` || ${reply_message}`, components: [row1] });
					// });

					// await collector.on('end', collected => {
					// 	msg.edit({ components: [] });
					// });
				})
			} catch(error) {
				console.log(error)
			}
		} else {
			return;
		}
	},
};
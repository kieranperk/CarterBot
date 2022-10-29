const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const config = require('../config.json');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		const msg = await message.content // Defines the provided message query
	
		if(message.author.id === config.clientId) return; // Returns if message is itself

		if(message.channel.isDMBased() || config.channelmode === "on" && message.channel.id === config.channelid) { // Checks if the message comes from a DM, or if (when the config is on) it came from a specific channel
			try {
				await message.channel.sendTyping()

				await fetch("https://api.carterapi.com/v0/chat", { // Fetches the response from CarterAPI
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						api_key: config.carterkey,
						'query': msg,
						'uuid': "user-id-123",
					})
				}).then(res => res.json())
				.then(async data => {

					const row1 = new ActionRowBuilder() // Downvote button builder
					.addComponents(
						new ButtonBuilder()
							.setCustomId('message_downvote')
							.setLabel('Downvote')
							.setEmoji('⬇️')
							.setStyle(ButtonStyle.Secondary),
					);
					
					const msg = await message.channel.send({ content: `${data.output.text}`, components: [row1] }) // Sends response to channel

					const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });
					collector.on('collect', async i => {
						await fetch("https://api.carterapi.com/v0/downvote", { // Sends downvote request to CarterAPI
							method: "POST",
							headers: {
								Accept: "application/json",
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								api_key: config.carterkey,
								tid: data.tid,
							}),
						});

						const row1 = new ActionRowBuilder() // Downvote button builder
							.addComponents(
								new ButtonBuilder()
								.setCustomId('message_downvote')
								.setLabel('Downvote')
								.setEmoji('⬇️')
								.setStyle(ButtonStyle.Secondary)
								.setDisabled(true),
							);	
						await i.update({ components: [row1] });
					});

					await collector.on('end', collected => {
						msg.edit({ components: [] });
					});
				});

			} catch(error) {
				console.log(error)
			}
		} else {
			return;
		}
	},
};
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		const msg = await message.content
	
		if(message.author.id === config.clientId) return; // Returns if message is itself
		if(message.channel.isDMBased()) { // If channel is not a DM
			try {
				await message.channel.sendTyping()
				await fetch("https://api.carterapi.com/v0/chat", {
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
				.then(data => {
					const row1 = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('message_downvote_' + data.tid)
							.setLabel('Downvote')
							.setEmoji('⬇️')
							.setStyle(ButtonStyle.Primary),
					);
					console.log('Message has been sent')
					message.channel.send({ content: `${data.output.text}`, components: [row1] })
				})
			} catch(error) {
				console.log(error)
			}
		}
	},
};
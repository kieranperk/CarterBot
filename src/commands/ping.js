const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true, ephemeral: true }); // Reply's to user with message

		const embed = new EmbedBuilder() // Embed builder
            .setColor('#ffcb6b')
            .setTitle('🏓 Pong!')
            .setDescription(`
			💗 Heartbeat: \`${interaction.client.ws.ping}ms.\`
			🚀 Roundtrip: \`${sent.createdTimestamp - interaction.createdTimestamp}ms\`
			⌚ Uptime: <t:${parseInt(interaction.client.readyTimestamp / 1000)}:R>
			`)

		interaction.editReply({ content: '', embeds: [embed] }); // Updates reply
	},
};
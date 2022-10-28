const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Sends you the bots life story...'),
	async execute(interaction) {
		const row1 = new ActionRowBuilder() // Link buttons builder
			.addComponents(
                new ButtonBuilder()
                    .setLabel('Invite CarterBot')
                    .setEmoji('<:CarterBot:1035567770236108850>')
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=1035353459353981020&permissions=8&scope=bot%20applications.commands')
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setLabel('Source Code')
                    .setEmoji('<:Github:1035569650521604106>')
                    .setURL('https://github.com/kieranperk/CarterBot')
                    .setStyle(ButtonStyle.Link),
				new ButtonBuilder()
					.setLabel('CarterAPI')
					.setEmoji('<:CarterAPI:1035567736325156867>')
                    .setURL('https://www.carterapi.com/')
					.setStyle(ButtonStyle.Link),
			);
        
        const embed = new EmbedBuilder() // Embed builder
            .setColor('#f3974f')
            .setTitle('📚 About CarterBot')
            .setDescription(`CarterBot is a project which intergrates [CarterAPI](https://www.carterapi.com/) into a discord bot. It utilizes the Discord.JS framework with CarterAPI to provide a realtime conversation through a users DM.`)
            .addFields(
                { name: 'Server Count:', value: String(interaction.client.guilds.cache.size)  },
            )
            .setThumbnail(interaction.client.user.displayAvatarURL({ extension: 'jpg' }))

        interaction.reply({ embeds: [embed], components: [row1] }); // Reply's to user with response
	},
};
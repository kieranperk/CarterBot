const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
            console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
        
// ===================================================
//                      BUTTONS
// ===================================================

        } else if (interaction.isButton()) {
            if (interaction.customId.startsWith('message_downvote_')) {
                const tid = await interaction.customId.replace('message_downvote_', '').split('_');

                await fetch("https://api.carterapi.com/v0/downvote", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        api_key: config.carterkey,
                        tid: tid,
                    }),
                });

                const row1 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('message_downvote' + Math.random() * 1000)
                    .setLabel('Downvote')
                    .setEmoji('⬇️')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                );
                
                await interaction.update({ components: [row1] });
                await interaction.channel.send({ content: 'Message has been downvoted!' })
            }
        }
    },
};


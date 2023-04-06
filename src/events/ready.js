const { ActivityType } = require('discord.js');
const term = require( 'terminal-kit' ).terminal;

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		term.table( [
				[ '^y░█████╗░░█████╗░██████╗░████████╗███████╗██████╗░██████╗░░█████╗░████████╗ ^y██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝ ^y██║░░╚═╝███████║██████╔╝░░░██║░░░█████╗░░██████╔╝██████╦╝██║░░██║░░░██║░░░ ^y██║░░██╗██╔══██║██╔══██╗░░░██║░░░██╔══╝░░██╔══██╗██╔══██╗██║░░██║░░░██║░░░ ^y╚█████╔╝██║░░██║██║░░██║░░░██║░░░███████╗██║░░██║██████╦╝╚█████╔╝░░░██║░░░ ^y░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚═════╝░░╚════╝░░░░╚═╝' ],
				[ `^+CarterBot is Ready! | Logged in as ${client.user.tag} | Ready for Chatting!` ] 
			] , {
				hasBorder: true ,
				contentHasMarkup: true ,
				borderChars: 'lightRounded' ,
				borderAttr: { color: 'yellow' } ,
				width: 76 ,
				fit: true   // Activate all expand/shrink + wordWrap
			}
		) ;
		console.log("Test")
	    client.user.setActivity('DMs! | carterlabs.ai', { type: ActivityType.Watching }); // Bot status
    },
};
const { SlashCommandBuilder } = require('@discordjs/builders'); // using discordjs/builders
const { REST } = require('@discordjs/rest'); // using discordjs/rest
const { Routes } = require('discord-api-types/v9'); // using discord-api-types/v9
const { clientId, guildId, token } = require('./config.json'); // using our config file

// Place additional commands into this commands array by reusing the existing line.
const commands = []

// I don't understand how the rest of this works. All I know is that it does.

.map(command => command.toJSON()); // Presumably, maps the commands created in the commands array above.

const rest = new REST({ version: '9' }).setToken(token); // creates a rest API, i think

(async () => {
try {
	
	   
	await rest.put(
		Routes.applicationCommands(clientId),
		   { body: commands },
	);

	await rest.put(
		Routes.applicationGuildCommands(clientId, "945857373938003968"),
		   { body: commands },
	);

	await rest.put(
		Routes.applicationGuildCommands(clientId, "881696548973600818"),
		   { body: commands },
	);
	   
	console.log('Submitted empty commands.');
	} catch (error) {
		console.error(error);
	}
})();
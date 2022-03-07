const { SlashCommandBuilder } = require('@discordjs/builders'); // using discordjs/builders
const { REST } = require('@discordjs/rest'); // using discordjs/rest
const { Routes } = require('discord-api-types/v9'); // using discord-api-types/v9
const { clientId, guildId, token } = require('./config.json'); // using our config file

// Place additional commands into this commands array by reusing the existing line.
const commands = [
    new SlashCommandBuilder().setName('cat').setDescription('Replies with a random cat!'), // a new slash command is made called cat. The description will appear in Discords command context menu
	new SlashCommandBuilder().setName('kanye').setDescription('Respond with only the Kanye Best.'),
	new SlashCommandBuilder().setName('pokemon').setDescription('Look up a Pokemon!').addStringOption(option => option.setName('input').setDescription('Enter a number to look up directly!').setRequired(true)),
	new SlashCommandBuilder().setName('bored').setDescription('Give yourself something to do!'),
	new SlashCommandBuilder().setName('number').setDescription('Cool number facts! Leave the input empty for a random number fact!').addStringOption(option => option.setName('input').setDescription('Enter a number to look up directly!')),
	new SlashCommandBuilder().setName('halo').setDescription('Replies with Halo kills!').addStringOption(option => option.setName('input').setDescription('Enter a gamertag!').setRequired(true)), // a new slash command is made called cat. The description will appear in Discords command context menu
]

// I don't understand how the rest of this works. All I know is that it does.

.map(command => command.toJSON()); // Presumably, maps the commands created in the commands array above.

const rest = new REST({ version: '9' }).setToken(token); // creates a rest API, i think

(async () => {
try {
	   
	await rest.put(
		Routes.applicationCommands(clientId),
		   { body: commands },
	);
	   
	console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
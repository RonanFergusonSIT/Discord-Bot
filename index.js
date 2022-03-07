// These are similar to C#'s using lines. They declare files which will be used by the application.

const { Client, Intents, Message, MessageSelectMenu, MessageEmbed, MessageAttachment } = require('discord.js'); // This loads in discord.js, and a number of contexts used. 
const { guildId, token } = require('./config.json'); // This loads in the config file, where you will store your bots token, ClientID and other relevant data.
const fetch = require('node-fetch'); // This loads in the API fetcher, which is used in this application to get the cat image. Other modules are available with varying features, however this is the easiest for this example.
const cron = require('cron'); // This loads in cron, which is used to set up a timer for repeating the cat post.
const { json } = require('stream/consumers');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] }); // This establishes the Discord client.
client.login(token); // This logs in the the client to our bot, using our bots token which can be found on the Discord Developer portal under bots.

const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

client.once('ready', () => { // This function will be ran once the client is operating. It is similar to the C# main method, but instead of being the default ran method it is just the first that happens to trigger here.
	console.log('Ready!'); // A simple log to say that the bot is operating.
    // let scheduledMessage = new cron.CronJob('0 * * * * *', async () => { // This creates a variable called scheduleMessage, which is a new cron job set to run every time the clock hits 0 seconds (once every minute, on the minute)
    //        const guild = client.guilds.cache.get(guildId); // This is your Servers ID, which can be found by enabling developer mode on Discord and right-clicking your server. We set this in config.json (Guilds are Discord.js's word for servers)
    //        const channel = guild.channels.cache.get('946922893999210546'); // This is the specific channel within the guild to send the message to. Here it is set manually. (This ID is the #cats in our project server)
    //        const {file} = await fetch('https://aws.random.cat/meow').then(response => response.json()); // This creates a file, which is created from a GET request to random.cat. random.cat sends back that file's URL as a JSON object that contains a link to the image.
    //        channel.send(file) // Here, we simply send the received URL as text. Discord will automatically load the image from the texts URL.

    //       });
        
    //     scheduledMessage.start() // This runs the inherited cron method to start the cronjob. 
});

client.on('interactionCreate', async interaction => { //This listener is called every time an interaction is made. Every slash command is an interaction.
	if (!interaction.isCommand()) return; // Verifies that the interaction is a command. Otherwise, returns nothing.
    const { commandName } = interaction; // commandName is created, storing interaction.

	if (commandName === 'cat') { console.log(interaction.member + " submitted the /cat command")
		await interaction.deferReply(); // In a nutshell, "wait for the reply to be ready before replying"
		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json()); // Identical to the previous example, gets a cat, storesuhy the URL
		interaction.editReply(file); // Instead of posting the cat in a specific place, the file is sent directly as a reply to the interaction
	} 
    
    else if (commandName === 'kanye') { console.log(interaction.member + " submitted the /kanye command")
		await interaction.deferReply();

		const { quote } = await fetch('https://api.kanye.rest/').then(response => response.json());
        const exampleEmbed = {
        title: quote,
        image: {url: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Kanye_West_at_the_Met_Gala_in_2019_2.png'},
        }
        interaction.editReply({ embeds: [exampleEmbed]});
	} 

    else if (commandName === 'pokemon') { console.log(interaction.member + " submitted the /pokemon command, input = "+interaction.options.getString('input'));
        await interaction.deferReply();
        const string = interaction.options.getString('input');
        
        if(string == null){interaction.editReply("Please enter a Pokemons name to use this command.");
        console.log("No Pokemon was provided. Returning");
        return;}

        else

		var pokeString = await fetch('https://pokeapi.co/api/v2/pokemon/'+string.toLowerCase()).then(response => response.text());

        if(pokeString === "Not Found") {interaction.editReply("Invalid Pokemon!"); 
        console.log("Input returned no results: input = "+interaction.options.getString('input'));
        return
    }
    else
        
        var {id, name, weight, height} = JSON.parse(pokeString);
        interaction.editReply("Pokemon ID: "+id+", "+name.charAt(0).toUpperCase() + name.slice(1) +": Weighs "+weight+" hg, at "+height+" decimetres tall");
    }

    else if (commandName === "bored") { console.log(interaction.member + " submitted the /bored command");
        await interaction.deferReply();
        const {activity, type, participants} = await fetch('https://www.boredapi.com/api/activity/').then(response => response.json());
        console.log("Replying with: How about you... "+ activity +"! ("+ type +" activity, "+ participants+" participants)")
        interaction.editReply("How about you... "+ activity +"! ("+ type +" activity, "+ participants+" participants)")
    }

    else if (commandName === "number") { console.log(interaction.member + " submitted the /number command");
		await interaction.deferReply();
		const string = interaction.options.getString('input');
        console.log(string)

        var numberFact
        
        if(string == null)
        {
            numberFact = await fetch(`http://numbersapi.com/random/trivia`).then(response => response.text());
            console.log("No given input - Replying with: "+numberFact);
            interaction.editReply(numberFact);
        }
        else
		numberFact = await fetch(`http://numbersapi.com/`+string)
			.then(response => response.text());
            console.log("Input: "+ string+ " - Replying with: "+numberFact);
            interaction.editReply(numberFact);
    }

    else if (commandName === 'halo') { console.log(interaction.member + " submitted the /halo command, input = "+interaction.options.getString('input'));
        await interaction.deferReply();
        const gt = { gamertag : "" + interaction.options.getString('input') + ""}
        const { data } = await fetch(`https://halo.api.stdlib.com/infinite@0.3.9/stats/service-record/multiplayer/`,{
            method: 'post', 
            body: JSON.stringify(gt), 
            headers: new fetch.Headers({
            'Authorization': "Bearer tok_dev_KyYPwoV5W5XxS1S6dnKxw27rqNwhGc2Ug548t3UG2Bw9d99QcGaqwPRmArH2FCc1",
            'Content-Type': 'application/json'
        }), 
    }).then(response => response.json());
    console.log("Replying with: Total Halo Infinite Kills: "+data.core.summary.kills)
    interaction.editReply("Total Halo Infinite Kills: "+ data.core.summary.kills + ".");
    } 

    
});


# Discord-Bot
A Discord Bot that takes stuff from Blackboard

This is a README file. It has information inside of it

This branch stores the test bot I created using various different APIs. It is available to deploy with a few steps.

1: Make sure you have node.js installed.
2: Navigate to where you have extracted this repo using nodejs cmd. Run the following npm commands: 
  npm install discord.js
  npm install @discordjs/builders @discordjs/rest discord-api-types
  npm install node-fetch@cjs
  npm install cron
2: Place your clientID and token into config.json
3: Run `node deploy-commands.js` in nodejs command prompt
4: Run `node index.js` in nodejs command prompt to host the bot

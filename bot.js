const { Client, GatewayIntentBits, REST } = require("discord.js");
const { Routes } = require('discord-api-types/v9');

// On récupère le token depuis le .env
const token = "YOURTOKEN";
const appid = "YOURAPPID";
const serverid = "YOURSERVERID";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

const commands = [
    {
        name: 'portfolio',
        description: 'Affiche le lien vers le portfolio de Sébastien Merveille.',
    },
    {
        name: 'help',
        description: 'Affiche la liste des commandes.',
    },
    {
        name: 'profil',
        description: 'Affiche les données de l\'utilisateur.',
    },

];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(appid, serverid),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on("ready", () => {
    console.log("The AI bot is online");
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'portfolio') {
        await interaction.reply("Lien vers le portfolio de [Sébastien Merveille](https://Sebastienmerv.be)");
    }
    if (commandName === 'help') {
        await interaction.reply("Liste des commandes :\n/portfolio : Affiche le lien vers le portfolio de Sébastien Merveille.\n/help : Affiche la liste des commandes.");
    }
    if (commandName === 'profil') {
        await interaction.reply('Votre nom d\'utilisateur : ' + interaction.user.username + '\nVotre ID : ' + interaction.user.id + '\n Votre photo de profil : ' + interaction.user.avatarURL() + '\nVotre tag : ' + interaction.user.tag);
    }
});


client.login(token);

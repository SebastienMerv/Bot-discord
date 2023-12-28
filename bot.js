const { Client, GatewayIntentBits, REST } = require("discord.js");
const { Routes } = require('discord-api-types/v9');

const token = "TOKEN";
const appid = "APP_ID";

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
    {
        name: 'social',
        description: 'Affiche les réseaux sociaux de Sébastien Merveille.',
    },
    {
        name: 'send',
        description: 'Envoie un message privé à un utilisateur.',
        options: [
            {
                name: 'user',
                type: 'USER',
                description: 'L\'utilisateur à qui envoyer le message.',
                required: true,
            },
            {
                name: 'content',
                type: 'STRING',
                description: 'Le contenu du message à envoyer.',
                required: true,
            },
        ],
    }
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(appid),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on("ready", () => {
    // On set le status du bot sur "OK"
    console.log("Le bot est prêt !");
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'portfolio') {
        await interaction.reply("Lien vers le portfolio de [Sébastien Merveille](https://Sebastienmerv.be)");
    }
    if (commandName === 'help') {
        reply = "Liste des commandes :"
        reply += "\n/portfolio : Affiche le lien vers le portfolio de Sébastien Merveille."
        reply += "\n/help : Affiche la liste des commandes."
        reply += "\n/profil : Affiche les données de l'utilisateur."
        await interaction.reply(reply);
    }
    if (commandName === 'profil') {
        reply = "Votre nom d'utilisateur : " + interaction.user.username
        reply += "\nVotre ID : " + interaction.user.id
        reply += "\nVotre photo de profil : " + interaction.user.avatarURL()
        reply += "\nVotre tag : " + interaction.user.tag
        await interaction.reply(reply);
    }
    if (commandName === 'social') {
        reply = "Lien vers le portfolio de [Sébastien Merveille](https://Sebastienmerv.be)"
        reply += "\nLien vers le github de [Sébastien Merveille](https://github.com/SebastienMerv)"
        reply += "\nLien vers le linkedin de [Sébastien Merveille](https://www.linkedin.com/in/sebastienmerv/)"
        reply += "\nLien vers le twitter de [Sébastien Merveille](https://twitter.com/SebastienMerv)"
        reply += "\nLien vers le youtube de [Sébastien Merveille](https://www.youtube.com/SebastienMerv)"
        await interaction.reply(reply);
    }
    if (commandName === 'send') {
        const user = interaction.options.getUser('user');
        const content = interaction.options.getString('content');

        await user.send(content);
        await interaction.reply(`Message envoyé à ${user.tag}`);
    }
});

client.login(token);

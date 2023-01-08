const { Client, GatewayIntentBits } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { encode, decode } = require('./shipher3')
const information = require('./INFORMATION.json');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});
// resolve=разрешавам reject=error


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'encode') {
        const s = interaction.options.getString('string', true)
        const key = interaction.options.getString('key', true)
        await interaction.reply({ content: encode(s, key), ephemeral: true })
    }
    if (interaction.commandName === 'decode') {
        const s = interaction.options.getString('string', true)
        const key = interaction.options.getString('key', true)
        await interaction.reply({ content: decode(s, key), ephemeral: true })
    }
});
client.on('guildMemberAdd', member => {
    console.log(member.user.username);
    const channel = client.channels.cache.find((channel) => channel.name == 'verifieds');
    channel.send('New member: ' + member.user.username);
    member.send('Hello member: ' + member.user.username)
});

client.login(information.TOKEN)

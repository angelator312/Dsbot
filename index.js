require('dotenv').config();
const {v4:random_string}=require('uuid');
const { start_web,init_mongo }= require("./web/index");
const { Client, GatewayIntentBits } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { encode, decode } = require('./shipher3')
const information = JSON.parse(process.env.INFO);
const session=init_mongo();
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});
// resolve=разрешавам reject=error

//functions:

// stop functions declarations

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'encode') {
        const s = interaction.options.getString('string', true);
        const key = interaction.options.getString('key', true);
        await interaction.reply({ content: encode(s, key), ephemeral: true })
    }
    if (interaction.commandName === 'decode') {
        const s = interaction.options.getString('string', true)
        const key = interaction.options.getString('key', true)
        await interaction.reply({ content: decode(s, key), ephemeral: true })
    }
    if (interaction.commandName==='test_role') {
        const mid=interaction.member.id;
        const gid=interaction.guild.id;
        const guild=client.guilds.cache.get(gid);
        console.log(guild.roles.cache.entries());
        const role=guild.roles.cache.find((r)=>r.name=='verified');
        const m=guild.members.cache.get(mid);
        await m.roles.add(role);
    }
});
client.on('guildMemberAdd', async member => {
    const uuid = random_string();
    console.log(member.user.username);
    const channel = client.channels.cache.find((channel) => channel.name == 'verifieds');
    channel.send('New member: ' + member.user.username);
    await session.addkey(uuid, {url:uuid,mid:member.id,gid:member.guild.id});
    member.send('Hello member: ' + member.user.username + ". Url for verify: http://dsbot.angelator312.top/verify/"+uuid);
});

client.login(information.TOKEN);
start_web(client);
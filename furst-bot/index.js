const { Client, GatewayIntentBits } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { encode, decode } = require('./shipher3')
const information = JSON.parse(process.env.INFO2);
const vicove = require('./vicove.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// resolve=разрешавам reject=error

function wait(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve() }, time)
    }
    )
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton()) {
        // console.log(interaction.customId);
        interaction.update({ content: 'Button Click!' })
    }
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
        await interaction.followUp(interaction.locale)
        // await interaction.deferReply();
        // await wait(4000);
        // await interaction.editReply('Pong!');
    }
    if (interaction.commandName === 'button2') {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('Click me!')
                    .setStyle(ButtonStyle.Primary),
            );

        await interaction.reply({ content: 'I think you should,', components: [row] });
    }
    if (interaction.commandName === 'number') {
        const n1 = interaction.options.getNumber('n1', true)
        const n2 = interaction.options.getNumber('n2', true)
        await interaction.reply(`Получава се ${n1 * n2}`)
    }
    if (interaction.commandName === 'joke') {
        await interaction.reply(vicove[
            Math.floor(Math.random() * vicove.length)
        ])
    }
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
    console.log(member)
});

client.login(information.TOKEN)

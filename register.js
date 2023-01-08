const { REST, Routes } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const information = require('./INFORMATION.json');
const encode = new SlashCommandBuilder()
  .setName('encode')
  .setDescription('Шифрира!!')
  .addStringOption(option =>
    option.setName('string')
      .setDescription('string for encoding')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('key')
      .setDescription('key for encoding')
      .setRequired(true))
const decode = new SlashCommandBuilder()
  .setName('decode')
  .setDescription('Декодира!!')
  .addStringOption(option =>
    option.setName('string')
      .setDescription('string for decoding')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('key')
      .setDescription('key for decoding')
      .setRequired(true))
const commands = [
  encode.toJSON(),
  decode.toJSON(),
];

const rest = new REST({ version: '10' }).setToken(information.TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    console.log(commands);
    const r = await rest.put(Routes.applicationCommands(information.CLIENT_ID), { body: commands });
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

